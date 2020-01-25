import React, { useRef, useContext, useCallback, useMemo } from 'react'
import GameStateContext from './GameStateContext'
import performSkillCheck from './performSkillCheck.js'

export default function DialogueNode ({ customScripts, customComponents, makeChoice, ...node }) {
  const { attemptedSkillChecks, skills, dispatch, characters } = useContext(GameStateContext)

  // Maybe premature optimization. We add dynamic chosenChoice to frozen-in-time processedNodeRef
  const processedNodeLazy = useMemo(() => processPassiveChecks(node, customScripts, skills), [])
  const processedNodeRef = useRef(processedNodeLazy)
  const processedNode = processedNodeRef.current
    ?  { ...processedNodeRef.current, chosenChoice: node.chosenChoice }
    : node

  const makeChoiceWithActiveSkillCheck = useCallback((choice) => {
    if (!choice.activeCheck) return makeChoice(choice)

    const { base, modifiersTotal, passed } = performSkillCheck(customScripts, choice.activeCheck.if, skills, true)

    dispatch({
      type: 'attemptActiveCheck',
      payload: {
        skillCheck: choice.activeCheck.if,
        skillLevel: base + modifiersTotal
      }
    })

    const next = passed ? choice.activeCheck.then : choice.activeCheck.else
    makeChoice({ ...choice, next })
  }, [])

  const choices = determineChoicesToDisplay(processedNode.choices, processedNode.chosenChoice, processedNode.next)
  const isHistory = !!processedNode.chosenChoice
  const character = characters[processedNode.character]

  return (
    <div className='dialogue-node'>
      {character &&
        <><span
          style={{ color: character.color }}
          className='dialogue-node__character'>
            {character.name}
        </span> - </>
      }
      {processedNode.text}
      {choices && choices.map((choice, index) => {
        const isLocked = !isHistory
          && choice.activeCheck
          && isSkillCheckLocked(choice.activeCheck.if, skills, attemptedSkillChecks, customScripts)
        return (
          <div
            key={index}
            className='dialogue-node__choice'
            onClick={!isHistory && !isLocked ? () => { makeChoiceWithActiveSkillCheck(choice) } : undefined}
          >
            {isLocked && <span className='dialogue-node__locked'>[Locked] </span>}
            {isHistory && <><span className='dialogue-node__character'>You</span> - </>}
            {choice.text}
          </div>
        )
      })}

      {processedNode.next && !choices && (
        <div
          className='dialogue-node__default-choice'
          style={{ backgroundColor: processedNode.nextSkillCheckColor }}
          onClick={!isHistory ? () => { makeChoiceWithActiveSkillCheck({ text: 'Continue', next: processedNode.next, isDefault: true }) } : undefined}
        >
          Continue
        </div>
      )}
    </div>
  )
}

// Perform passive skill checks and convert meaningful ones into
// a chain of dialogue nodes. The last node in the chain will inherit
// the "choices" and "next" properties from the input node.
//
// Will likely need to be handled statefully in DialogueNode component.
//
// TODO: make sure string-referenced then clauses work
function processPassiveChecks (node, customScripts, skills) {
  if (!node.passiveChecks) return node

  let processedNode = { ...node, passiveChecks: null, next: null, choices: null }
  let deepestNode = processedNode
  node.passiveChecks.forEach((skillCheck) => {
    const color = skills[skillCheck.if.skill].color
    skillCheck.then.character = skillCheck.then.character || skills[skillCheck.if.skill].displayName

    const { passed } = performSkillCheck(customScripts, skillCheck.if, skills)
    if (passed && skillCheck.then) {
      deepestNode.next = skillCheck.then
      deepestNode.nextSkillCheckColor = color
      deepestNode = skillCheck.then
    } else if (!passed && skillCheck.else) {
      deepestNode.next = skillCheck.else
      deepestNode.nextSkillCheckColor = color
      deepestNode = skillCheck.else
    }
  })

  if (!deepestNode.next && !deepestNode.choices) {
    deepestNode.next = node.next
    deepestNode.choices = node.choices
  }

  return processedNode
}

function isSkillCheckLocked (skillCheck, skills, attemptedSkillChecks, customScripts) {
  const { base, modifiersTotal } = performSkillCheck(customScripts, skillCheck, skills)
  const lastAttemptedValue = attemptedSkillChecks.get(skillCheck)
  return lastAttemptedValue >= base + modifiersTotal
}

function determineChoicesToDisplay (choices, chosenChoice, next) {
  // We know we are in history if chosenChoice exists.
  // We don't show default choice in history
  if (chosenChoice) return chosenChoice.isDefault ? [] : [chosenChoice]
  return choices
}
