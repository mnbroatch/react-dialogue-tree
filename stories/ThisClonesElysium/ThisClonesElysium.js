import React, { useState } from 'react'
import GameStateContext from './GameStateContext.js'
import DEDialogueTree from './DEDialogueTree.js'
import DialogueTree from 'react-dialogue-tree'
import DialogueNode from './DialogueNode.js'

import dialogue from './dialogue.json'
import characters from './ceilingFanDialogueCharacters.json'
import skills from './ceilingFanDialogueSkills.json'
import initialState from './ceilingFanDialogueInitialState.json'

export default function Blah () {
  const [gameState, setGameState] = useState(initialState)

  const customScripts = {
    getProperty: ({ propertyName }) => gameState[propertyName],
    toggleProperty: ({ propertyName }) => setGameState(prevState => ({ ...prevState, [propertyName]: !prevState[propertyName] }))
  }

  const treeEngine = new DEDialogueTree(dialogue, customScripts, skills)

  return (
    <div className={'dialogue-tree-container dialogue-tree-container--this-clones-elysium'}>
      <GameStateContext.Provider value={{ characters }}>
        <DialogueTree
          dialogue={dialogue}
          customComponents={{ default: DialogueNode }}
          treeEngine={treeEngine}
        />
      </GameStateContext.Provider>
    </div>
  )
}
