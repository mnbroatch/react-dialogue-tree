import React, { useState, useEffect, useCallback } from 'react'
import DialogueTree from './DialogueTree.js'
import runCustomScript from './runCustomScript.js'

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
  const choices = choicesNode && choicesNode.filter(choice => !choice.hideIf || !runCustomScript(choice.hideIf, customScripts, currentNode))

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
  let newNode = findNode(dialogue, choice.then)

  // Drill through nested conditional branches until we hit a concrete node
  while (Array.isArray(newNode)) {
    const clauseToUse = newNode
      .find((clause, index) =>
        index === newNode.length - 1
        || clause.chooseIf.every((accessPathOrScriptObject) => !!runCustomScript(accessPathOrScriptObject, customScripts, choice))
      )
    newNode = (clauseToUse && findNode(dialogue, clauseToUse)) || { ...newNode, then: null }
  }

  return newNode
}

function findNode (dialogue, newNodeOrId) {
  if (typeof newNodeOrId === 'object') return newNodeOrId
  return dialogue[newNodeOrId]
}

function runCustomScripts (node, customScripts) {
  if (node.scripts) {
    node.scripts.forEach((accessPathOrScriptObject) => {
      runCustomScript(accessPathOrScriptObject, customScripts, node)
    })
  }
}
