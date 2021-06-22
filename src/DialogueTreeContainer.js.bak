import React, { useState, useCallback, useMemo } from 'react'
import DialogueTree from './DialogueTree.js'
import JSDialogueTree from './JSDialogueTree.js'

export default function DialogueTreeContainer ({
  dialogue,
  startAt,
  customComponents,
  customScripts,
  scrollSpeed,
  treeEngine = new JSDialogueTree(dialogue, customScripts)
}) {
  const [history, setHistory] = useState([])

  const [currentNode, setCurrentNode] = useState(() => {
    return treeEngine.resolveDialogueNode(startAt || 'root')
  })

  const makeChoice = useCallback((choice) => {
    const newNode = treeEngine.makeChoice(choice)
    setHistory([...history, { ...currentNode, chosenChoice: choice }])
    setCurrentNode(newNode)
  }, [history, currentNode])

  return (
    <DialogueTree
      currentNode={currentNode}
      history={history}
      makeChoice={makeChoice}
      customComponents={customComponents}
    />
  )
}
