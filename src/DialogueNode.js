import React, { useEffect } from 'react'
import DialogueNodeChoices from './DialogueNodeChoices.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function DialogueNode (props) {
  const {
    active,
    changeNode,
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
        active={active}
        choices={choices}
        chosenChoice={chosenChoice}
        changeNode={changeNode}
        customScripts={customScripts}
        then={then}
      />
    </div>
  )
}
