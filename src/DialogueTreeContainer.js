import React, { useState, useEffect, useCallback } from 'react'
import getFromNestedObject from '../utilities/getFromNestedObject.js'
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
  const [currentNode, setCurrentNode] = useState(resolveNode(dialogue, startAt, customScripts))

  const makeChoice = useCallback((choice) => {
    const newNode = resolveNode(dialogue, choice.next, customScripts)

    runCustomScripts(choice, customScripts)
    runCustomScripts(newNode, customScripts)

    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  useEffect(() => { runCustomScripts(startAt, customScripts) }, [])

  // Allows reuse of a set of choices across multiple nodes
  const choicesNode = resolveNode(dialogue, currentNode.choices, customScripts)
  const choices = choicesNode && choicesNode.filter(choice =>
    !choice.hideIf
    || !runCustomScript(choice.hideIf, customScripts)
  )

  const not = (scriptCall) => !runCustomScript(scriptCall.if, customScripts)

  return (
    <DialogueTree
      currentNode={{ ...currentNode, choices }}
      history={history}
      makeChoice={makeChoice}
      customComponents={customComponents}
      customScripts={{ ...customScripts, not }}
    />
  )
}

function resolveConditionalNode (dialogue, node, customScripts) {
  if (!node.if) return node

  return runCustomScript(node.if, customScripts)
    ? resolveConditionalNode(dialogue, node.then, customScripts)
    : resolveConditionalNode(dialogue, node.else, customScripts)
}

function resolveNode (dialogue, node, customScripts) {
  if (!node) return node
  let resolvedNode = node

  // Loop is because conditional node could resolve to a string
  while (typeof resolvedNode === 'string' || resolvedNode.if) {
    resolvedNode = resolveNodePath(dialogue, resolvedNode)
    resolvedNode = resolveConditionalNode(
      dialogue,
      resolvedNode,
      customScripts
    )
  }

  return resolvedNode
}

function resolveNodePath (dialogue, nodeOrPath) {
  if (typeof nodeOrPath === 'object') return nodeOrPath
  return getFromNestedObject(dialogue, nodeOrPath)
}

function runCustomScripts (node, customScripts) {
  if (node.scripts) {
    node.scripts.forEach((scriptCall) => {
      runCustomScript(scriptCall, customScripts)
    })
  }
}
