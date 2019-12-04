import React, { useEffect } from 'react'
import DialogueNodeChoices from './DialogueNodeChoices.js'

export default function DialogueNode (props) {
  const {
    active,
    changeNode,
    choices,
    chosenChoice,
    customComponent,
    customComponents,
    script,
    customScripts,
    styles = {},
    text,
    then,
    transformText
  } = props
  useEffect(() => {
    if (active && script) findScript(customScripts, script)()
  }, [])

  const rootClassName = active
    ? 'dialogue-node dialogue-node--current'
    : 'dialogue-node'

  const rootStyles = active
    ? { ...styles.dialogueNode, ...styles.dialogueNodeCurrent }
    : { ...styles.dialogueNode }

  return (
    <div style={rootStyles} className={rootClassName}>
      {text}
      <DialogueNodeChoices
        active={active}
        choices={choices}
        chosenChoice={chosenChoice}
        changeNode={changeNode}
        customScripts={customScripts}
        styles={styles.dialogueTreeInner} 
        then={then}
        transformText={transformText}
      />
    </div>
  )
}

function findScript (customScripts, accessPath) {
  if (!accessPath) return null
  const pathSegments = accessPath.split('.')
  return pathSegments.reduce((acc, seg) => acc[seg], customScripts)
}
