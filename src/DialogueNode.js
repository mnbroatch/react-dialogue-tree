import React, { useEffect } from 'react'
import DialogueNodeChoices from './DialogueNodeChoices.js'

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
    if (script) findScript(customScripts, script)()
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

function findScript (customScripts, accessPath) {
  if (!accessPath) return null
  const pathSegments = accessPath.split('.')
  return pathSegments.reduce((acc, seg) => acc[seg], customScripts)
}
