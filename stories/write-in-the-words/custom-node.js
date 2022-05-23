// WIP
import React, { useCallback, useState } from 'react'
// import rough from 'roughjs'
import PropTypes from 'prop-types'
import CustomText from './custom-text'
import useInterval from './use-interval'

const SPEECH_BUBBLE_INTERVAL = 500

export default function WriteInTheWordsDialogueNode ({
  node: {
    text, options, selected, isDialogueEnd
  },
  defaultOption,
  finalOption,
  isHistory,
  advance
}) {
  const [bubblePath, setBubblePath] = useState('')
  if (isHistory) return null
  if (!options) {
    return (
      <a className='dialogue-node' onClick={advance}>
        <div className='dialogue-node__background'>
        </div>
        <div className='dialogue-node__content'>
          <CustomText text={text} />
        </div>
      </a>
    )
  }
}

WriteInTheWordsDialogueNode.propTypes = {
  node: PropTypes.shape({
    text: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      isAvailable: PropTypes.bool
    })),
    selected: PropTypes.number,
    isDialogueEnd: PropTypes.bool
  }),
  defaultOption: PropTypes.string,
  finalOption: PropTypes.string,
  isHistory: PropTypes.bool,
  advance: PropTypes.func
}

