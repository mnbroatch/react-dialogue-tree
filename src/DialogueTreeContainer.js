import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import Dominatrix from './Dominatrix.js'
import cloneDeep from 'lodash/cloneDeep'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
}) {
  const dominatrix = useMemo(() => new Dominatrix({
    dialogue,
    startAt,
    functions,
    variableStorage,
    combineTextAndOptionNodes: true
  }), [])

  const [currentNode, setCurrentNode] = useState(dominatrix.currentNode)

  const [history, setHistory] = useState([])

  const advance = useCallback((option) => {
    const newNode = cloneDeep(dominatrix.advance(option))
    // const oldNode = cloneDeep(currentNode)
    const oldNode = JSON.parse(JSON.stringify(currentNode))
    setHistory([...history, { ...oldNode, chosenOption: option }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  return (
    <DialogueTree
      currentNode={currentNode}
      history={history}
      advance={advance}
    />
  )
}
