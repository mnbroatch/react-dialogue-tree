import React from 'react'
import PropTypes from 'prop-types'

export default function DialogueNode ({
  node,
  node: {
    text, options, selected, isDialogueEnd
  },
  defaultOption,
  finalOption,
  isHistory,
  advance
}) {
  let optionItems
  if (options) {
    optionItems = options
      .filter((option, index) => !isHistory || index === selected)
      .map((option, index) => (
        <li
          key={index}
          className={[
            'dialogue-node__option',
            !option.isAvailable && 'dialogue-node__option--disabled'
          ].filter(Boolean).join(' ')}
          onClick={!isHistory && option.isAvailable ? () => { advance(index) } : undefined }
        >
          {option.text}
        </li>
      ))
  } else {
    optionItems = !isHistory && <li
      className='dialogue-node__option dialogue-node__option--default'
      onClick={advance}
    >
      { isDialogueEnd ? finalOption : defaultOption }
    </li>
  }

  return (
    <div className='dialogue-node'>
      {text}
      {
        optionItems && (
          <ul className='dialogue-node__options'>
            { optionItems }
          </ul>
        )
      }
    </div>
  )
}

DialogueNode.propTypes = {
  node:
  PropTypes.shape({
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
