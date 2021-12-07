import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import Dominatrix from './Dominatrix.js'
import cloneDeep from 'lodash/cloneDeep'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  handleCommand,
  combineTextAndOptionNodes,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
}) {
  const dominatrix = useMemo(() => new Dominatrix({
    dialogue,
    startAt,
    functions,
    variableStorage,
    handleCommand,
    combineTextAndOptionNodes,
    onDialogueEnd
  }), [])

  const [currentNode, setCurrentNode] = useState(dominatrix.currentNode)

  const [history, setHistory] = useState([])

  const advance = useCallback((optionIndex) => {
    dominatrix.advance(optionIndex)
    const newNode = dominatrix.currentNode
    if (newNode) {
      setHistory([...history, { ...cloneDeep(currentNode), chosenOption: optionIndex || 0 }])
      setCurrentNode(cloneDeep(newNode))
    }
  }, [currentNode])

  return (
    <DialogueTree
      currentNode={currentNode}
      history={history}
      advance={advance}
      defaultOption={defaultOption}
    />
  )
}
