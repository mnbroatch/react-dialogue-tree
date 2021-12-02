import React from 'react'

export default function DialogueNode ({
  node,
  node: {
    text, options, chosenOption,
  },
  defaultOption,
  advance
}) {
  const isHistory = typeof chosenOption !== 'undefined'
  console.log('node', node)
  console.log('isHistory', isHistory)
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
    optionItems = !isHistory && <li
      className='dialogue-node__option dialogue-node__option--default'
      onClick={!isHistory ? () => { advance() } : undefined }
    >
      { defaultOption }
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
