import React from 'react'
import PropTypes from 'prop-types'
import DialogueTree from './DialogueTree.js'
import useYarnBound from './use-yarn-bound.js'

export default function DialogueTreeContainer ({
  dialogue,
  startAt = 'Start',
  functions,
  variableStorage,
  handleCommand = () => {},
  stopAtCommand = false,
  combineTextAndOptionsResults = true,
  onDialogueEnd = () => {},
  defaultOption = 'Next',
  finalOption = 'End',
  customNode,
  useRunner = useYarnBound,
  locale
}) {
  const { runnerRef, advance } = useRunner({
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
  })

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
  stopAtCommand: PropTypes.bool,
  combineTextAndOptionsResults: PropTypes.bool,
  onDialogueEnd: PropTypes.func,
  defaultOption: PropTypes.string,
  finalOption: PropTypes.string,
  locale: PropTypes.string,
  customNode: PropTypes.elementType,
  useRunner: PropTypes.func
}
