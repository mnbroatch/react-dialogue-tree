import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import YarnWrapped from 'yarn-wrapped'
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
  const runner = useMemo(() => new YarnWrapped({
    dialogue,
    startAt,
    functions,
    variableStorage,
    handleCommand,
    combineTextAndOptionNodes,
    onDialogueEnd
  }), [])

  const [currentNode, setCurrentNode] = useState(runner.currentNode)

  const [history, setHistory] = useState([])

  const advance = useCallback((optionIndex) => {
    runner.advance(optionIndex)
    const newNode = runner.currentNode
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
