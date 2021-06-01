import React, { useState, useRef, useContext, useCallback, useMemo } from 'react'
import GameStateContext from './GameStateContext'

const defaultText = 'Continue'

export default function DialogueNode ({ makeChoice, ...node }) {
  const { characters } = useContext(GameStateContext)

  const choices = determineChoicesToDisplay(node)
  const isHistory = !!node.chosenChoice
  const character = characters[node.character]

  return (
    <div className='dialogue-node'>
      {character &&
        <><span
          style={{ color: character.color }}
          className='dialogue-node__character'>
          {character.name}
        </span> - </>
      }
      {node.text}

      {choices && choices.map((choice, index) => {
        if (choice.isDefault && isHistory) return null

        const isLocked = !isHistory
          && choice.activeCheck
          && choice.locked

        const className = [
          'dialogue-node__choice',
          choice.isDefault && 'dialogue-node__choice--default'
        ].filter(Boolean).join(' ')

        const text = choice.text || defaultText

        return (
          <div
            key={index}
            style={{ backgroundColor: node.nextSkillCheckColor }}
            className={className}
            onClick={!isHistory && !isLocked ? () => { makeChoice(choice) } : undefined}
          >
            {isLocked && <span className='dialogue-node__locked'>[Locked] </span>}
            {isHistory && <><span className='dialogue-node__character'>You</span> - </>}
            {text}
          </div>
        )
      })}
    </div>
  )
}

function determineChoicesToDisplay (node) {
  // We know we are in history if chosenChoice exists.
  // We don't show default choice in history
  if (node.chosenChoice) return node.chosenChoice.isDefault ? [] : [node.chosenChoice]
  return node.choices
}
