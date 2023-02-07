import { useCallback, useEffect, useRef } from 'react'
import YarnBound from 'yarn-bound/src/index'
import useForceUpdate from './use-force-update'

export default function useYarnBound ({
  dialogue,
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
    runnerRef.current.stopAtCommand = stopAtCommand
    runnerRef.current.variableStorage = variableStorage
  }, [combineTextAndOptionsResults, handleCommand, variableStorage, stopAtCommand])

  const forceUpdate = useForceUpdate()

  const advance = useCallback((optionIndex) => {
    runnerRef.current.advance(optionIndex)
    forceUpdate()
    if (!runnerRef.current.currentResult) {
      onDialogueEnd()
    }
  }, [runnerRef.current])

  return {
    runnerRef,
    advance
  }
}
