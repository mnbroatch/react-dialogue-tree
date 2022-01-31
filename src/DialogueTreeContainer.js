import React, { useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useForceUpdate from './use-force-update'
import DialogueTree from './DialogueTree.js'
import Bondage from '@mnbroatch/bondage/src/index'

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
  locale
}) {
  const runner = useMemo(() => new Bondage({
    dialogue,
    startAt,
    functions,
    variableStorage,
    handleCommand,
    combineTextAndOptionsResults,
    locale
  }), [dialogue])

  useEffect(() => {
    runner.combineTextAndOptionsResults = combineTextAndOptionsResults
    runner.handleCommand = handleCommand
    runner.variableStorage = variableStorage
  }, [combineTextAndOptionsResults, handleCommand, variableStorage])

  const forceUpdate = useForceUpdate()

  const advance = useCallback((optionIndex) => {
    runner.advance(optionIndex)
    forceUpdate()
    if (!runner.currentResult) {
      onDialogueEnd()
    }
  }, [runner])

  return (
    <DialogueTree
      className='mnbroatch-react-dialogue-tree'
      currentResult={runner.currentResult}
      history={runner.history}
      advance={advance}
      defaultOption={defaultOption}
      finalOption={finalOption}
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
  ]).isRequired,
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
  locale: PropTypes.string
}
