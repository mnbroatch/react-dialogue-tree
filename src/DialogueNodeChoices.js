import React, { useState, useCallback } from 'react'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

// TODO: "Choice Has Been Clicked Before" indicator
export default function DialogueNodeChoices ({
  goToNode,
  choices,
  chosenChoice,
  customScripts,
  script,
  text,
  then
}) {
  const choicesToDisplay = getChoicesToDisplay(choices, chosenChoice, then)
  if (!choicesToDisplay.length) return null

  return (
    <ul className='dialogue-node-choices'>
      {choicesToDisplay.map((choice, index) => {
        const choiceCallback = () => {
          if (!!chosenChoice) return
          const scriptToRun = getFromNestedObject(customScripts, choice.script)
          if (scriptToRun) scriptToRun(choice)
          goToNode(choice)
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
  )
}

function getChoicesToDisplay (choices, chosenChoice, then) {
  if (!choices && !then) return [] // Last node in dialogue

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
