import React, { useState, useCallback } from 'react'

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
  if (Array.isArray(choices) && choices.length === 0) {
    //  Empty array explicitly means no choices.
    //  Dead end unless custom component calls changeNode.
    return null
  } else if (!choices) {
    choices = [{ text: 'Continue', then }]
  } else if (chosenChoice) {
    choices = [chosenChoice]
  }

  // TODO: "Choice Has Been Clicked Before" indicator

  return (
    <ul className='dialogue-node-choices'>
      {choices.map((choice, index) => {
        if (choice.hiddenWhen && customScripts[choice.hiddenWhen]()) return null

        const choiceCallback = () => {
          if (!active) return
          const scriptToRun = findScript(customScripts, script)
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

function findScript (customScripts, accessPath) {
  if (!accessPath) return null
  const pathSegments = accessPath.split('.')
  return pathSegments.reduce((acc, seg) => acc[seg], customScripts)
}
