import React, { useState, useMemo, useContext } from 'react'
import getFromNestedObject from '../utilities/getFromNestedObject.js'
import useInterval from 'react-useinterval'
import DialogueTree, { DialogueNode as DefaultDialogueNode } from 'react-dialogue-tree'
import SourceCode from './SourceCode.js';
import sourceCode from '!!raw-loader!./ThisClonesElysium.js'

const firstDialogue = {
  root: {
    character: 'Dark Room',
    text: 'A bright prism of light beams through the dust-riddled darkness',
    then: {
      skillChecks: [
        {
          skill: 'Savvy',
          test: 'tests.canSeeComputer',
          pass: 'An iMac G4 from 2003. You admire its ironically edgy dome shape. Wiggling its adjustable monitor and arm, you are impressed that the motion is still fluid twenty years later.',
        }
      ],
      choices: [
        {
          text: 'Try something',
          then: 'root'
        }
      ]
    }
  }
}


/*
 *
 * Color of continue button with one skill check: matches skill?
 *
 */


const GameStateContext = React.createContext({})

const DialogueNode = (props) => {
  const { customScripts, customComponents, makeChoice, ...node } = props

  const gameState = useContext(GameStateContext)

  const [ processedNode, setProcessedNode ] = useState()
  const memoizedValue = useMemo(() => setProcessedNode(processSkillChecks(node, customScripts)), [])

  const chosenChoice = node.chosenChoice && {
    ...node.chosenChoice,
    text: <TextWithCharacterLabel character={'You'} text={node.chosenChoice.text} />
  }

  if (!processedNode) return null

  return (
    <DefaultDialogueNode
      {...processedNode}
      chosenChoice={chosenChoice}
      customScripts={customScripts}
      customComponents={customComponents}
      makeChoice={makeChoice}
      text={<TextWithCharacterLabel character={processedNode.character} text={processedNode.text} />}
    />
  )
}

const TextWithCharacterLabel = ({ character, text }) => {
  if (!text) return null
  if (!character) return text

  return (
    <>
      <span className='dialogue-tree-character'>{character}</span>
      -{text}
    </>
  )
}

// Perform passive skill checks and convert relevant ones into dialogue nodes.
// These dialogue nodes form a chain of skill checks, terminated with
// the supplied (root) node, without its already-handled skill checks, of course.
// If supplied node has no text, choices will be attached to last skill check node
// instead, rather than show a weird-looking node with only choices.
//
// ...Whew!
function processSkillChecks (node, customScripts) {
  const { skillChecks = [], ...nodeWithoutSkillChecks } = node

  let processedNode = { ...node, then: null, thenConditional: null, choices: null }
  let deepestNode = processedNode
  skillChecks.forEach((skillCheck) => {
    if (deepestNode.then) return
    const passed = performPassiveSkillCheck(customScripts, skillCheck.test)
    if (passed && !skillCheck.passText || !passed && !skillCheck.failText) return

    const skillCheckNode = {
      text: passed ? skillCheck.passText : skillCheck.failText,
      character: skillCheck.character
    }
    deepestNode.then = skillCheckNode
    deepestNode = skillCheckNode
  })

  deepestNode.then = node.then
  deepestNode.thenConditional = node.thenConditional
  deepestNode.choices = node.choices
  console.log('node', node)
  console.log('processedNode', processedNode)
  return processedNode
}

function performPassiveSkillCheck (customScripts, test) {
  return true
  // return getFromNestedObject(customScripts, test)()
}

export default () => {
  const [ dialogue, setDialogue ] = useState(firstDialogue)
  const [ gameState, setGameState ] = useState({
    fanIsOn: true,
    necktieIsOnFan: true,
    lightIsOn: false,
    youAreStillPhotosensitive: true
  })

  const customScripts = {
    tests: Object.entries(gameState).reduce((acc, [entryKey, entryValue]) => (
      { ...acc, [entryKey]: () => entryValue }
    ), []),
    toggles: Object.entries(gameState).reduce((acc, [entryKey, entryValue]) => (
      { ...acc, [entryKey]: () => { setGameState({ ...gameState, [entryKey]: !entryValue }) } }
    ), [])
  }

  return (
    <div>
      <SourceCode customStyle={{ marginRight: 350, paddingBottom: 'none' }}>{sourceCode}</SourceCode>
      <div className={'dialogue-tree-container dialogue-tree-container--this-clones-elysium'}>
        <DialogueTree
          dialogue={dialogue}
          customComponents={{ default: DialogueNode }}
          customScripts={customScripts}
        />
      </div>
    </div>
  )
}
