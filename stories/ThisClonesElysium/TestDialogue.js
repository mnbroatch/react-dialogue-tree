import React, { useState } from 'react'
import GameStateContext from './GameStateContext.js'
import DEDialogueTree from './DEDialogueTree.js'
import DialogueTree  from 'react-dialogue-tree'
import DialogueNode from './DialogueNode.js'

import dialogue from './testDialogue.json'
import characters from './ceilingFanDialogueCharacters.json'
import skills from './ceilingFanDialogueSkills.json'
import initialState from './ceilingFanDialogueInitialState.json'

export default () => {
  const [ gameState, setGameState ] = useState(initialState)

  const customScripts = {
    true: () => true,
    false: () => false
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
