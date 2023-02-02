import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useForceUpdate from './use-force-update'
import DialogueTree from './DialogueTree.js'
import YarnBound from 'yarn-bound/src/index'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  handleCommand = () => {},
  combineTextAndOptionsResults = true,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
  finalOption = 'End',
  customNode,
  runner,
  locale
}) {
  const runnerRef = useRef(runner || null)
  if (runnerRef.current === null) {
    runnerRef.current = new YarnBound({
      dialogue,
      startAt,
      functions,
      variableStorage,
      handleCommand,
      combineTextAndOptionsResults,
      locale
    })
  }

  useEffect(() => {
    runnerRef.current.combineTextAndOptionsResults = combineTextAndOptionsResults
    runnerRef.current.handleCommand = handleCommand
    runnerRef.current.variableStorage = variableStorage
  }, [combineTextAndOptionsResults, handleCommand, variableStorage])

  const forceUpdate = useForceUpdate()

  const advance = useCallback((optionIndex) => {
    runnerRef.current.advance(optionIndex)
    forceUpdate()
    if (!runnerRef.current.currentResult) {
      onDialogueEnd()
    }
  }, [runnerRef.current])

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
  dialogue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }))
  ]),
  runner: PropTypes.object,
  startAt: PropTypes.string,
  functions: PropTypes.objectOf(PropTypes.func),
  variableStorage: PropTypes.shape({
    get: PropTypes.func,
    set: PropTypes.func
  }),
  handleCommand: PropTypes.func,
  combineTextAndOptionsResults: PropTypes.bool,
  onDialogueEnd: PropTypes.func,
  defaultOption: PropTypes.string,
  finalOption: PropTypes.string,
  locale: PropTypes.string,
  customNode: PropTypes.elementType
}
