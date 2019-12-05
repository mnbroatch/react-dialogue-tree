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
    if (script) getFromNestedObject(customScripts, script)()
  }, [])

  const rootClassName = active
    ? 'dialogue-node dialogue-node--current'
    : 'dialogue-node'

  return (
    <div className={rootClassName}>
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
