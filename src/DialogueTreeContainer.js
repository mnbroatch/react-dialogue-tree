import React, { useState, useCallback } from 'react'
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

    if (choice.scripts) {
      choice.scripts.forEach((scriptAccessPath) => {
        const script = getFromNestedObject(customScripts, scriptAccessPath)
        if (script) script(choice)
      })
    }

    if (newNode.scripts) {
      newNode.scripts.forEach((scriptAccessPath) => {
        const script = getFromNestedObject(customScripts, scriptAccessPath)
        if (script) script(newNode)
      })
    }

    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

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
