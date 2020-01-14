import React, { useState, useEffect, useCallback } from 'react'
import DialogueTree from './DialogueTree.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = dialogue && dialogue.root,
  customComponents = {},
  customScripts = {},
  scrollSpeed = 8
}) {
  if (!startAt) {
    console.error('DialogueTree requires a "dialogue" object with a "root" node, or one that matches the startAt prop')
    return null
  }

  const [history, setHistory] = useState([])
  const [currentNode, setCurrentNode] = useState(findNode(dialogue, startAt))

  const makeChoice = useCallback((choice) => {
    const newNode = getNextNode(dialogue, choice, customScripts)

    runCustomScripts(choice, customScripts)
    runCustomScripts(newNode, customScripts)

    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  useEffect(() => { runCustomScripts(startAt, customScripts) }, [])

  // Allows reuse of a set of choices in multiple nodes
  const choices = findNode(dialogue, currentNode.choices)

  return (
    <DialogueTree
      currentNode={{ ...currentNode, choices }}
      history={history}
      makeChoice={makeChoice}
      customComponents={customComponents}
      customScripts={customScripts}
    />
  )
}

function getNextNode (dialogue, choice, customScripts) {
  if (choice.thenConditional) {
    console.log('choice', choice)
    const clauseToUse = choice.thenConditional
      .find((clause, index) =>
        index === choice.thenConditional.length - 1
        || clause.tests.every((test) => getFromNestedObject(customScripts, test)())
      )

    return findNode(dialogue, clauseToUse.then)
  }

  return findNode(dialogue, choice.then)
}

function findNode (dialogue, newNodeOrId) {
  if (typeof newNodeOrId === 'object') return newNodeOrId
  return dialogue[newNodeOrId]
}

function runCustomScripts (node, customScripts) {
  if (node.scripts) {
    node.scripts.forEach((scriptAccessPath) => {
      const script = getFromNestedObject(customScripts, scriptAccessPath)
      if (script) script(node)
    })
  }
}
