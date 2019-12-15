import React, { useState, useCallback } from 'react'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

// TODO: "Choice Has Been Clicked Before" indicator
export default function DialogueNodeChoices ({
  goToNode,
  choices,
  chosenChoice,
  customScripts,
  scripts,
  text,
  then
}) {
  const choicesToDisplay = getChoicesToDisplay(choices, chosenChoice, then)
  if (!choicesToDisplay.length) return null

  return (
    <ul className='dialogue-node-choices'>
      {choicesToDisplay.map((choice, index) => {
        const choiceCallback = () => {
          if (chosenChoice) return //  We are in history

          if (choice.scripts) {
            choice.scripts.forEach((scriptAccessPath) => {
              const script = getFromNestedObject(customScripts, scriptAccessPath)
              if (script) script(choice)
            })
          }

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

// We don't always just show the choices provided. History is
// displayed differently, and default node is added when needed.
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
