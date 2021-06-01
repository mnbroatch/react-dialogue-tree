import React from 'react'

export default function DialogueNode ({
  text,
  makeChoice,
  choices,
  chosenChoice,
  next
}) {
  const choicesToDisplay = determineChoicesToDisplay(choices, chosenChoice, next)

  return (
    <div className='dialogue-node'>
      {text}
      {!!choicesToDisplay.length && (
        <ul className='dialogue-node__choices'>
          {choicesToDisplay.map((choice, index) => {
            const className = [
              'dialogue-node__choice',
              choice.isDefault && 'dialogue-node__default-choice'
            ].filter(Boolean)

            return (
              <li
                key={index}
                className={className}
                onClick={!chosenChoice ? () => { makeChoice(choice) } : undefined}
              >
                {choice.text}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

// We only show chosen choice in history (omitting default choices).
function determineChoicesToDisplay (choices, chosenChoice) {
  if (chosenChoice) {
    // We know we are in history
    return chosenChoice.isDefault ? [] : [chosenChoice]
  }

  return choices || []
}
