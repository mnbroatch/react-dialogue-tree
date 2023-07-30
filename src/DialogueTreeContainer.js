import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import YarnBound from 'yarn-bound/src/index'
import DialogueTree from './DialogueTree.js'
import useForceUpdate from './use-force-update'

export default function DialogueTreeContainer ({
  runner,
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  handleCommand = () => {},
  pauseCommand,
  combineTextAndOptionsResults = true,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
  finalOption = 'End',
  customNode,
  locale
}) {
  const runnerRef = useRef(runner || new YarnBound({
    dialogue,
    startAt,
    functions,
    variableStorage,
    handleCommand,
    pauseCommand,
    combineTextAndOptionsResults,
    locale
  }))

  const advance = useCallback((optionIndex) => {
    if (runnerRef.current.currentResult.isDialogueEnd) {
      onDialogueEnd()
    }
    runnerRef.current.advance(optionIndex)
    forceUpdate()
  }, [runnerRef.current])

  const forceUpdate = useForceUpdate()

  // todo: think about what should be supported here
  useEffect(() => {
    runnerRef.current.combineTextAndOptionsResults = combineTextAndOptionsResults
    if (variableStorage) {
      runnerRef.current.runner.setVariableStorage(variableStorage)
    }
  }, [combineTextAndOptionsResults, variableStorage])

  return (
    <DialogueTree
      className='mnbroatch-react-dialogue-tree'
      currentResult={runnerRef.current.currentResult}
      history={runnerRef.current.history}
      advance={advance}
      defaultOption={defaultOption}
      finalOption={finalOption}
      customNode={customNode}
    />
  )
}

DialogueTreeContainer.propTypes = {
  runner: PropTypes.object,
  dialogue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }))
  ]),
  startAt: PropTypes.string,
  functions: PropTypes.objectOf(PropTypes.func),
  variableStorage: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func
  }),
  handleCommand: PropTypes.func,
  pauseCommand: PropTypes.string,
  combineTextAndOptionsResults: PropTypes.bool,
  onDialogueEnd: PropTypes.func,
  defaultOption: PropTypes.string,
  finalOption: PropTypes.string,
  locale: PropTypes.string,
  customNode: PropTypes.elementType
}
