import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import YarnBound from 'yarn-bound'
import cloneDeep from 'lodash/cloneDeep'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  handleCommand,
  combineTextAndOptionsResults,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
}) {
  const runner = useMemo(() => new YarnBound({
    dialogue,
    startAt,
    functions,
    variableStorage,
    handleCommand,
    combineTextAndOptionsResults
  }), [])

  const [currentResult, setCurrentResult] = useState(runner.currentResult)

  const [history, setHistory] = useState([])

  const advance = useCallback((optionIndex) => {
    runner.advance(optionIndex)
    const newResult = runner.currentResult
    if (newResult) {
      setHistory([...history, { ...cloneDeep(currentResult), chosenOption: optionIndex || 0 }])
      setCurrentResult(cloneDeep(newResult))
    } else {
      onDialogueEnd()
    }
  }, [currentResult])

  return (
    <DialogueTree
      currentResult={currentResult}
      history={history}
      advance={advance}
      defaultOption={defaultOption}
    />
  )
}
