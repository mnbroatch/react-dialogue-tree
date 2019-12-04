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
    scripts,
    styles = {},
    text,
    then
  } = props
  useEffect(() => {
    if (active && script) findScript(scripts, script)()
  }, [])

  const rootClassName = active
    ? 'dialogue-node dialogue-node--current'
    : 'dialogue-node'

  const rootStyles = active
    ? { ...styles.dialogueNode, ...styles.dialogueNodeCurrent }
    : { ...styles.dialogueNode }

  //  Need intermediary variable because it has to be TitleCase
  const MaybeCustomComponent = customComponents && customComponents[customComponent]
  const prompt = MaybeCustomComponent
    ? <MaybeCustomComponent {...props} />
    : text

  return (
    <div style={rootStyles} className={rootClassName}>
      {prompt}
      <DialogueNodeChoices
        active={active}
        choices={choices}
        chosenChoice={chosenChoice}
        changeNode={changeNode}
        scripts={scripts}
        styles={styles.dialogueTreeInner} 
        then={then}
      />
    </div>
  )
}

function findScript (scripts, accessPath) {
  if (!accessPath) return null
  const pathSegments = accessPath.split('.')
  return pathSegments.reduce((acc, seg) => acc[seg], scripts)
}
