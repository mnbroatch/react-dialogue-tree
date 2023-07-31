import React from 'react'
import PropTypes from 'prop-types'

export default function DialogueNode ({
  node: {
    text, options: allOptions, selected, isDialogueEnd
  },
  defaultOption,
  finalOption,
  isHistory,
  advance
}) {
  let options
  if (!allOptions && !isHistory) {
    options = [{
      text: isDialogueEnd ? finalOption : defaultOption,
      className: [
        'dialogue-node__option',
        isDialogueEnd && 'dialogue-node__option--final',
        !isDialogueEnd && 'dialogue-node__option--default'
      ].filter(Boolean).join(' '),
      onClick: !isHistory
        ? () => { advance() }
        : undefined
    }]
  } else if (allOptions) {
    options = allOptions
      .filter((option, index) => !isHistory || index === selected)
      .map(({ text, isAvailable }, index) => ({
        text,
        className: [
          'dialogue-node__option',
          !isAvailable && 'dialogue-node__option--disabled'
        ].filter(Boolean).join(' '),
        onClick: !isHistory && isAvailable
          ? () => { advance(index) }
          : undefined
      }))
  }

  return (
    <div className={[
      'dialogue-node',
      isHistory && 'dialogue-node--history'
    ].filter(Boolean).join(' ')}>
      {text}
      { options && (
        <ul className='dialogue-node__options'>
          {
            options.map(({ text: optionText, className, isAvailable, onClick }, index) => (
              <li
                key={index}
                className={className}
                onClick={onClick}
              >
                {optionText}
              </li>
            ))
          }
        </ul>
      )}
    </div>
  )
}

DialogueNode.propTypes = {
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
