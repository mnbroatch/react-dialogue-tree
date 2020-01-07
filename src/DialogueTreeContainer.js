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
  const [currentNode, setCurrentNode] = useState(startAt)

  const makeChoice = useCallback((choice) => {
    const newNode = findNode(dialogue, choice.then)
    if (!newNode) console.error(`Tried going to this missing node: ${choice.then}`)

    runCustomScripts(choice, customScripts)
    runCustomScripts(newNode, customScripts)

    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  useEffect(() => { runCustomScripts(startAt, customScripts) }, [])

  return (
    <DialogueTree
      currentNode={currentNode}
      history={history}
      makeChoice={makeChoice}
      customComponents={customComponents}
      customScripts={customScripts}
    />
  )
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
