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

  // Allows reuse of a set of choices across multiple nodes
  const choicesNode = findNode(dialogue, currentNode.choices)
  const choices = choicesNode && choicesNode.filter(choice => !choice.showIff || runCustomScript(choice.showIff, customScripts, currentNode))

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
  const newNode = findNode(dialogue, choice.then)

  if (!newNode.conditional) return newNode

  const clauseToUse = newNode.conditional
    .find((clause, index) =>
      index === newNode.conditional.length - 1
      || clause.tests.every((accessPath) => !!runCustomScript(accessPath, customScripts, choice))
    )
  return findNode(dialogue, clauseToUse.then)
}

function findNode (dialogue, newNodeOrId) {
  if (typeof newNodeOrId === 'object') return newNodeOrId
  return dialogue[newNodeOrId]
}

function runCustomScripts (node, customScripts) {
  if (node.scripts) {
    node.scripts.forEach((accessPath) => {
      runCustomScript(accessPath, customScripts, node)
    })
  }
}

function runCustomScript (accessPath, customScripts, node) {
  const isNegated = accessPath[0] === '!'
  const script = isNegated
    ? getFromNestedObject(customScripts, accessPath.slice(1))
    : getFromNestedObject(customScripts, accessPath)

  return script && (isNegated ? !script() : script())
}
