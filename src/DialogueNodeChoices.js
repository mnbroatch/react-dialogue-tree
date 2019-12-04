import React, { useState, useCallback } from 'react'

export default function DialogueNodeChoices ({
  active,
  changeNode,
  choices,
  chosenChoice,
  script,
  scripts,
  styles = {},
  text,
  then,
  transformText
}) {
  if (Array.isArray(choices) && choices.length === 0) {
    //  Empty array explicitly means no choices.
    //  Dead end unless customComponent calls changeNode.
    return null
  } else if (!choices) {
    choices = [{ text: 'Continue', then }]
  } else if (chosenChoice) {
    choices = [chosenChoice]
  }

  // TODO: "Choice Has Been Clicked Before" indicator

  return (
    <ul style={styles.choices} className='dialogue-node-choices'>
      {choices.map((choice, index) => {
        if (choice.hiddenWhen && scripts[choice.hiddenWhen]()) return null

        const choiceCallback = () => {
          if (!active) return
          const scriptToRun = findScript(scripts, script)
          if (scriptToRun) scriptToRun()
          changeNode(choice)
        }

        return (
          <li
            key={index}
            className='dialogue-node-choices__choice'
            onClick={active ? choiceCallback : undefined}
          >
            {transformText ? transformText(choice.text) : text}
          </li>
        )
      })}
    </ul>
  )
}

function findScript (scripts, accessPath) {
  if (!accessPath) return null
  const pathSegments = accessPath.split('.')
  return pathSegments.reduce((acc, seg) => acc[seg], scripts)
}
