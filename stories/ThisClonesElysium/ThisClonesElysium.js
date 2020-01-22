import React, { useState, useReducer, useContext, useCallback, useMemo } from 'react'
import getFromNestedObject from '../../utilities/getFromNestedObject.js'
import useInterval from 'react-useinterval'
import DialogueTree, { DialogueNode as DefaultDialogueNode } from 'react-dialogue-tree'
import performSkillCheck from './performSkillCheck.js';
import dialogue from './ceilingFanDialogue.json';
// import dialogue from './dialogue.json';

//  TODO:
//    - actual skill check mechanics
//    - locking white checks
//    - removing red checks
//
//    - IMPORTANT: skill checks with their own dialogue chains
//      - What if multiple checks have chains?
//
//    - adding check metadata to result
//    - display active check modifiers
//    - continue button color
//    - general styling
//    - text at bottom (possible?)
//    - gaining items, exp, et cetera in dialogue (?)


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

const DialogueNode = (props) => {
  const { customScripts, customComponents, makeChoice, ...node } = props
  const gameState = useContext(GameStateContext)
  const processedNode = useMemo(() => processPassiveChecks(node, customScripts, gameState), [])

  const makeChoiceWithActiveSkillCheck = useCallback((choice) => {
    if (!choice.activeCheck) return makeChoice(choice)

    const passed = performSkillCheck(customScripts, choice.activeCheck, gameState, true)
    const next = passed ? choice.activeCheck.pass : choice.activeCheck.fail
    makeChoice({ ...choice, next })
  }, [])

  const chosenChoice = node.chosenChoice && {
    ...node.chosenChoice,
    text: <TextWithCharacterLabel character={'You'} text={node.chosenChoice.text} />
  }

  if (!processedNode) return null

  return (
    <DefaultDialogueNode
      {...processedNode}
      text={<TextWithCharacterLabel character={node.character} text={node.text} />}
      chosenChoice={chosenChoice}
      customScripts={customScripts}
      customComponents={customComponents}
      makeChoice={makeChoiceWithActiveSkillCheck}
    />
  )
}

const TextWithCharacterLabel = ({ character, text }) => {
  if (!text) return null
  if (!character) return text

  return (
    <>
      <span className='dialogue-tree-character'>{character}</span> - {text}
    </>
  )
}



// Perform passive skill checks and convert meaningful ones into
// a chain of dialogue nodes. The last node in the chain will inherit
// the "choices" and "next" properties from the input node.
//
// Will likely need to be handled statefully in DialogueNode component.
function processPassiveChecks (node, customScripts, gameState) {
  if (!node.passiveChecks) return node

  let processedNode = { ...node, then: null, next: null, passiveChecks: null, choices: null }
  let deepestNode = processedNode
  node.passiveChecks.forEach((passiveCheck) => {
    if (!performSkillCheck(customScripts, passiveCheck.if, gameState)) return
    deepestNode.then = passiveCheck.then
    deepestNode = passiveCheck.then
  })

  if (!deepestNode.next && !deepestNode.choices) {
    deepestNode.next = node.next
    deepestNode.choices = node.choices
  }

  return processedNode
}

function isSkillCheckLocked (skillCheck, gameState) {
  const attempt = gameState.attemptedSkillChecks.get(skillCheck) 
  return attempt && attempt.value >= gameState.skills[skillCheck.skill]
}

function gameStateReducer (state, action) {
  if (action.type === 'toggle') {
    return { ...state, flags: { ...state.flags, [action.payload]: !state.flags[action.payload] } }
  }
}

export default () => {
  const [ gameState, dispatch ] = useReducer(gameStateReducer, initialState)

  const customScripts = {
    getFlag: ({ flagName }) => gameState.flags[flagName],
    toggleFlag: ({ flagName }) => dispatch({ type: 'toggle', payload: flagName }),
    skillCheck: skillCheck => performSkillCheck(customScripts, skillCheck, gameState)
  }

  return (
    <div>
      <div className={'dialogue-tree-container dialogue-tree-container--this-clones-elysium'}>
        <GameStateContext.Provider value={gameState} >
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
