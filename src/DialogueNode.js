import React from 'react'

export default function DialogueNode ({
  text,
  makeChoice,
  choices,
  chosenChoice,
  then
}) {
  const choicesToDisplay = determineChoicesToDisplay(choices, chosenChoice, then)

  return (
    <div className='dialogue-node'>
      {text}
      {choicesToDisplay.length && (
        <ul className='dialogue-node-choices'>
          {choicesToDisplay.map((choice, index) => {
            const choiceCallback = () => {
              //  if chosenChoice exists, we are in history
              if (!chosenChoice) makeChoice(choice)
            }

            return (
              <li
                key={index}
                className='dialogue-node-choices__choice'
                onClick={!chosenChoice ? choiceCallback : undefined}
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

// We don't always just show the choices provided. History is
// displayed differently, and default node is added when needed.
function determineChoicesToDisplay (choices, chosenChoice, then) {
  if (!choices && !then) return [] // Terminal node of dialogue

  if (choices) {
    // Empty array will explicitly mean no choices rendered.
    if (choices.length === 0) return []
    if (chosenChoice) return [chosenChoice]
    return choices
  }

  return chosenChoice
    ? [] // Don't clutter history with default choice
    : [{ text: 'Continue', then }]
}
