import React, { useReducer } from 'react'
import DialogueTree  from 'react-dialogue-tree'
import DialogueNode from './DialogueNode.js'
import GameStateContext from './GameStateContext.js'
import performSkillCheck from './performSkillCheck.js'

function attemptedSkillChecksReducer (state, action) {
  if (action.type === 'attemptActiveCheck') {
    const newState = new Map(state)
    newState.set(action.payload.skillCheck, action.payload.skillLevel)
    return newState
  }
}

export default function ThisClonesElysium ({
  dialogue={},
  skills={},
  characters={},
  customScripts={},
  customComponents={}
}) {
  const [ attemptedSkillChecks, dispatch ] = useReducer(attemptedSkillChecksReducer, new Map())

  return (
    <div>
      <div className={'dialogue-tree-container dialogue-tree-container--this-clones-elysium'}>
        <GameStateContext.Provider value={{ skills, attemptedSkillChecks, characters, dispatch }}>
          <DialogueTree
            dialogue={dialogue}
            customComponents={{ ...customComponents, default: DialogueNode }}
            customScripts={{
              ...customScripts,
              skillCheck: skillCheck => performSkillCheck(customScripts, skillCheck, skills).passed
            }}
          />
        </GameStateContext.Provider>
      </div>
    </div>
  )
}
