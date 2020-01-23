import React, { useState, useReducer, useRef, useContext, useCallback, useMemo } from 'react'
import getFromNestedObject from '../../utilities/getFromNestedObject.js'
import useInterval from 'react-useinterval'
import DialogueTree, { DialogueNode as DefaultDialogueNode } from 'react-dialogue-tree'
import performSkillCheck from './performSkillCheck.js';
import dialogue from './ceilingFanDialogue.json';
// import dialogue from './dialogue.json';

//  TODO:
//  - red checks
//
//  - adding passive check difficulty after result
//  - display active check modifiers
//
//  - continue button colors
//  - general styling
//
//  - text at bottom (possible?)
//  - gaining items, exp, et cetera in dialogue (?)

const DialogueNode = ({ customScripts, customComponents, makeChoice, ...node }) => {
  const { gameState, dispatch } = useContext(GameStateContext)

  // Maybe premature optimization. Need to add dynamic chosenChoice to frozen-in-time processedNodeRef
  const processedNodeLazy = useMemo(() => processPassiveChecks(node, customScripts, gameState), [])
  const processedNodeRef = useRef(processedNodeLazy)
  const processedNode = processedNodeRef.current
    ?  { ...processedNodeRef.current, chosenChoice: node.chosenChoice }
    : node

  const makeChoiceWithActiveSkillCheck = useCallback((choice) => {
    if (!choice.activeCheck) return makeChoice(choice)

    const { base, modifiersTotal, passed } = performSkillCheck(customScripts, choice.activeCheck, gameState, true)

    dispatch({
      type: 'attemptActiveCheck',
      payload: {
        skillCheck: choice.activeCheck,
        skillLevel: base + modifiersTotal
      }
    })

    const next = passed ? choice.activeCheck.pass : choice.activeCheck.fail
    makeChoice({ ...choice, next })
  }, [])

  const choices = determineChoicesToDisplay(processedNode.choices, processedNode.chosenChoice, processedNode.next)
  const isHistory = !!processedNode.chosenChoice

  return (
    <div className='dialogue-node'>
      {processedNode.character && <><span className='dialogue-node__character'>{processedNode.character}</span> - </>}
      {processedNode.text}
      {choices && choices.map((choice, index) => {
        const isLocked = !isHistory && choice.activeCheck && isSkillCheckLocked(choice.activeCheck, gameState, customScripts)
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
function processPassiveChecks (node, customScripts, gameState) {
  console.log('123', 123)
  if (!node.passiveChecks) return node

  let processedNode = { ...node, then: null, next: null, passiveChecks: null, choices: null }
  let deepestNode = processedNode
  node.passiveChecks.forEach((skillCheck) => {
    const { passed } = performSkillCheck(customScripts, skillCheck.if, gameState)
    if (passed) {
      deepestNode.next = skillCheck.then
      deepestNode = skillCheck.then
    }
  })

  if (!deepestNode.next && !deepestNode.choices) {
    deepestNode.next = node.next
    deepestNode.choices = node.choices
  }

  return processedNode
}

function isSkillCheckLocked (skillCheck, gameState, customScripts) {
  const { base, modifiersTotal } = performSkillCheck(customScripts, skillCheck, gameState)
  const lastAttemptedValue = gameState.attemptedSkillChecks.get(skillCheck) 
  return lastAttemptedValue >= base + modifiersTotal
}

const initialState = {
  skills: {
    savoirFaire: 1,
    // interfacing: 1,
    // endurance: 1,
    // painThreshold: 1,
    // inlandEmpire: 1
    // savoirFaire: 10,
    interfacing: 10,
    endurance: 10,
    painThreshold: 10,
    inlandEmpire: 10
  },
  flags: {
    fanIsOn: true,
    necktieIsOnFan: true,
    hasNecktie: false,
    lightIsOn: false,
    hasOvercomePhotosensitivity: false,
    hasFailedToGrabNecktie: false
  },
  attemptedSkillChecks: new Map()
}

const GameStateContext = React.createContext(initialState)

function gameStateReducer (state, action) {
  if (action.type === 'toggle') {
    return { ...state, flags: { ...state.flags, [action.payload]: !state.flags[action.payload] } }
  } else if (action.type === 'attemptActiveCheck') {
    const newAttemptedSkillChecks = new Map(state.attemptedSkillChecks)
    newAttemptedSkillChecks.set(action.payload.skillCheck, action.payload.skillLevel)
    return { ...state, attemptedSkillChecks: newAttemptedSkillChecks }
  }
}

export default () => {
  const [ gameState, dispatch ] = useReducer(gameStateReducer, initialState)

  const customScripts = {
    getFlag: ({ flagName }) => gameState.flags[flagName],
    toggleFlag: ({ flagName }) => dispatch({ type: 'toggle', payload: flagName }),
    skillCheck: skillCheck => performSkillCheck(customScripts, skillCheck, gameState).passed
  }

  return (
    <div>
      <div className={'dialogue-tree-container dialogue-tree-container--this-clones-elysium'}>
        <GameStateContext.Provider value={{ gameState, dispatch }} >
          <DialogueTree
            dialogue={dialogue}
            customComponents={{ default: DialogueNode }}
            customScripts={customScripts}
          />
        </GameStateContext.Provider>
      </div>
    </div>
  )
}

function determineChoicesToDisplay (choices, chosenChoice, next) {
  // We know we are in history if chosenChoice exists.
  // We don't show default choice in history
  if (chosenChoice) return chosenChoice.isDefault ? [] : [chosenChoice]
  return choices
}
