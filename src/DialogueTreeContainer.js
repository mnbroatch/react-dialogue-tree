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
  const [currentNode, setCurrentNode] = useState(resolveNodePath(dialogue, startAt))

  const makeChoice = useCallback((choice) => {
    const newNode = getNextNode(dialogue, choice, customScripts)

    runCustomScripts(choice, customScripts)
    runCustomScripts(newNode, customScripts)

    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  useEffect(() => { runCustomScripts(startAt, customScripts) }, [])

  // Allows reuse of a set of choices across multiple nodes
  const choicesNode = resolveNodePath(dialogue, currentNode.choices)
  const choices = choicesNode && choicesNode.filter(choice =>
    !choice.hideIf
    || !testAntecedent(choice.hideIf, customScripts, choice)
  )

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
  const maybeNewNode = resolveNodePath(dialogue, choice.next)
  const newNode = Array.isArray(maybeNewNode)
    ? resolveConditional(maybeNewNode, dialogue, choice, customScripts)
    : maybeNewNode

  return newNode || { ...newNode, next: null }
}

function resolveConditional (conditional, dialogue, choice, customScripts) {
  const clauseToUse = conditional
    .find((clause, index) =>
      index === conditional.length - 1
      || testAntecedent(clause.if, customScripts, choice)
    )
  const newNode = (clauseToUse && resolveNodePath(dialogue, clauseToUse.then))
  // Handle nested conditionals recursively
  return Array.isArray(newNode)
    ? resolveConditional(newNode, dialogue, choice, customScripts)
    : newNode
}

export function testAntecedent (antecedent, customScripts) {
  if (!antecedent) return false
  return Array.isArray(antecedent)
    ? antecedent.every((condition) => runCustomScript(condition, customScripts))
    : runCustomScript(antecedent, customScripts)
}

function resolveNodePath (dialogue, newNodeOrId) {
  if (typeof newNodeOrId === 'object') return newNodeOrId
  return getFromNestedObject(dialogue, newNodeOrId)
}

function runCustomScripts (node, customScripts) {
  if (node.scripts) {
    node.scripts.forEach((accessPathOrScriptObject) => {
      runCustomScript(accessPathOrScriptObject, customScripts)
    })
  }
}
