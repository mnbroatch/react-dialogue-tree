import React, { useCallback, useEffect, useMemo } from 'react'
import useForceUpdate from './use-force-update'
import DialogueTree from './DialogueTree.js'
import YarnBound from 'yarn-bound'

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
  }), [dialogue])

  useEffect(() => {
    runner.combineTextAndOptionsResults = combineTextAndOptionsResults
    runner.handleCommand = handleCommand
    runner.variableStorage = variableStorage
  }, [combineTextAndOptionsResults, handleCommand, variableStorage])

  const forceUpdate = useForceUpdate()

  const advance = useCallback((optionIndex) => {
    runner.advance(optionIndex)
    console.log('runner.currentResult', runner.currentResult)
    forceUpdate()
    if (runner.currentResult.isDialogueEnd) {
      onDialogueEnd()
    }
  }, [runner])

  return (
    <DialogueTree
      currentResult={runner.currentResult}
      history={runner.history}
      advance={advance}
      defaultOption={defaultOption}
    />
  )
}
