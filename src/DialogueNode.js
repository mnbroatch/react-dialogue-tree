import React, { useEffect } from 'react'
import DialogueNodeChoices from './DialogueNodeChoices.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function DialogueNode (props) {
  const {
    goToNode,
    choices,
    chosenChoice,
    customScripts,
    script,
    text,
    then
  } = props
  useEffect(() => {
    if (!script) return

    const scriptToRun = getFromNestedObject(customScripts, script)
    if (scriptToRun) {
      scriptToRun(props)
    } else {
      console.error(`DialogueTree: script missing in customScripts object: ${script}`)
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
