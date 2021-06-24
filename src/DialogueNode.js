import React from 'react'

export default function DialogueNode ({
  node: {
    text, options, chosenOption
  },
  advance
}) {
  let optionItems
  if (options) {
    optionItems = options.map((option, index) => (
      <li
        key={index}
        className='dialogue-node__option'
        onClick={!chosenOption ? () => { advance(index) } : undefined}
      >
        {option}
      </li>
    ))
  } else {
    optionItems = <li
      className='dialogue-node__option'
      onClick={!chosenOption ? () => { advance() } : undefined}
    >
            Next
    </li>
  }

  return (
    <div className='dialogue-node'>
      {text}
      <ul className='dialogue-node__options'>
        { optionItems }
      </ul>
    </div>
  )
}
