import { useCallback, useEffect, useRef } from 'react'
import YarnBound from 'yarn-bound/src/index'
import useForceUpdate from './use-force-update'

export default function useYarnBound ({
  dialogue = 'title: Start\n---\ndummy\n===',
  startAt,
  functions,
  variableStorage,
  handleCommand,
  stopAtCommand,
  combineTextAndOptionsResults,
  onDialogueEnd,
  defaultOption,
  finalOption,
  customNode,
  locale
}) {
  const runnerRef = useRef(new YarnBound({
    dialogue,
    startAt,
    functions,
    variableStorage,
    combineTextAndOptionsResults,
    locale
  }))

  useEffect(() => {
    runnerRef.current.combineTextAndOptionsResults = combineTextAndOptionsResults
    if (variableStorage) {
      runnerRef.current.runner.setVariableStorage(variableStorage)
    }
  }, [combineTextAndOptionsResults, variableStorage])

  const forceUpdate = useForceUpdate()

  const advance = useCallback((optionIndex) => {
    runnerRef.current.advance(optionIndex)
    forceUpdate()
    if (!runnerRef.current.currentResult) {
      onDialogueEnd()
    }
  }, [runnerRef.current])

  useEffect(() => {
    if (runnerRef.current.currentResult instanceof YarnBound.CommandResult) {
      if (handleCommand) handleCommand(runnerRef.current.currentResult)
      if (!stopAtCommand) advance()
    }
  }, [runnerRef.current.currentResult])

  return {
    runnerRef,
    advance
  }
}
