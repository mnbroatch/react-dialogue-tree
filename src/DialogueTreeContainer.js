import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import Dominatrix from './Dominatrix.js'
import cloneDeep from 'lodash/cloneDeep'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
}) {
  const dominatrix = useMemo(() => new Dominatrix({
    dialogue,
    startAt,
    functions,
    variableStorage,
    combineTextAndOptionNodes: true,
    onDialogueEnd
  }), [])

  const [currentNode, setCurrentNode] = useState(dominatrix.currentNode)

  const [history, setHistory] = useState([])

  const advance = useCallback((optionIndex) => {
    const newNode = cloneDeep(dominatrix.advance(optionIndex))
    const oldNode = cloneDeep(currentNode)
    if (newNode) {
      setHistory([...history, { ...oldNode, chosenOption: optionIndex || 0 }])
      setCurrentNode(newNode)
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
