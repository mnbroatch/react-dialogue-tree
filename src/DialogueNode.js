import React, { useEffect } from 'react'
import DialogueNodeChoices from './DialogueNodeChoices.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function DialogueNode (props) {
  const {
    goToNode,
    choices,
    chosenChoice,
    customScripts,
    scripts,
    text,
    then
  } = props
  useEffect(() => {
    if (scripts) {
      scripts.forEach((scriptAccessPath) => {
        const script = getFromNestedObject(customScripts, scriptAccessPath)
        if (script) script(props)
      })
    }
  }, [])

  return (
    <div className='dialogue-node'>
      {text}
      <DialogueNodeChoices
        choices={choices}
        chosenChoice={chosenChoice}
        goToNode={goToNode}
        customScripts={customScripts}
        then={then}
      />
    </div>
  )
}
