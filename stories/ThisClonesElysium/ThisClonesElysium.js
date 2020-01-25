import React, { useState } from 'react'
import ThisClonesElysiumBase from './ThisClonesElysiumBase.js'
import dialogue from './ceilingFanDialogue.json'
import characters from './ceilingFanDialogueCharacters.json'
import skills from './ceilingFanDialogueSkills.json'
import initialState from './ceilingFanDialogueInitialState.json'

export default () => {
  const [ gameState, setGameState ] = useState(initialState)

  const customScripts = {
    getProperty: ({ propertyName }) => gameState[propertyName],
    toggleProperty: ({ propertyName }) => setGameState(prevState => ({ ...prevState, [propertyName]: !prevState[propertyName] }))
  }

  return (
    <ThisClonesElysiumBase
      dialogue={dialogue}
      characters={characters}
      skills={skills}
      customScripts={customScripts}
    />
  )
}
