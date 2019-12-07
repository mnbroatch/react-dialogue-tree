import React, { useState, useCallback } from 'react'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function DialogueNodeChoices ({
  active,
  changeNode,
  choices,
  chosenChoice,
  customScripts,
  script,
  text,
  then
}) {
  // TODO: "Choice Has Been Clicked Before" indicator

  choices = getChoices(choices, chosenChoice, then)
  if (!choices) return null

  return (
    <ul className='dialogue-node-choices'>
      {choices.map((choice, index) => {
        if (choice.hiddenWhen && customScripts[choice.hiddenWhen]()) return null
        if (!active && choice.hideInHistory) return null

        const choiceCallback = () => {
          if (!active) return
          const scriptToRun = getFromNestedObject(customScripts, script)
          if (scriptToRun) scriptToRun()
          changeNode(choice)
        }

        return (
          <li
            key={index}
            className='dialogue-node-choices__choice'
            onClick={active ? choiceCallback : undefined}
          >
            {choice.text}
          </li>
        )
      })}
    </ul>
  )
}

function getChoices (choices, chosenChoice, then) {
  switch (true) {
    case (!!chosenChoice):
      return [chosenChoice]  // Only show chosen choice, if applicable
    case (!choices && !!then):
      // Construct default choice. Not in love with special flag for
      // the "hide if in history" feature but I can live with it.
      return [{ text: 'Continue', then, hideInHistory: true }]

    //  We can't rely solely on absence of "then" property to disable
    //  choices, because a custom component might use that property to
    //  call changeNode({ then }).
    case (Array.isArray(choices) && choices.length === 0):
    case (!choices && !then):
      return null
    default:
      return choices
  }
}
