import React from 'react'

export default function DialogueNode ({
  node: {
    text, options, chosenOption
  },
  advance
}) {
  const isHistory = typeof chosenOption !== 'undefined'
  let optionItems
  if (options) {
    optionItems = options
      .filter((option, index) => !isHistory || index === chosenOption)
      .map((option, index) => (
        <li
          key={index}
          className='dialogue-node__option'
          onClick={!isHistory ? () => { advance(index) } : undefined }
        >
          {option}
        </li>
      ))
  } else {
    optionItems = <li
      className='dialogue-node__option'
      onClick={!isHistory ? () => { advance() } : undefined }
    >
      { !isHistory && 'Next' }
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
