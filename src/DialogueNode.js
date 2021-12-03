import React from 'react'

export default function DialogueNode ({
  node,
  node: {
    text, options, chosenOption, isDialogueEnd
  },
  defaultOption,
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
    optionItems = !isDialogueEnd && !isHistory && <li
      className='dialogue-node__option dialogue-node__option--default'
      onClick={!isHistory ? () => { advance() } : undefined }
    >
      { defaultOption }
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
