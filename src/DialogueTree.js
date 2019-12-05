import React, { useState, useEffect, useCallback, useRef } from 'react'
import DialogueNode from './DialogueNode.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

import './styles.css'

export default function DialogueTree ({
  dialogue,
  customComponents = {},
  customScripts = {}
}) {
  const [ history, setHistory ] = useState([])
  const [ currentNode, setCurrentNode ] = useState(dialogue.root)
  const innerRef = useRef()

  const changeNode = useCallback((choice) => {
    const newNode = findNode(dialogue, choice.then)
    setHistory([ ...history, { ...currentNode, chosenChoice: choice } ])
    setCurrentNode(newNode)
  })

  useEffect(() => {
    innerRef.current.lastChild.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div className='dialogue-tree'>
      <div className='dialogue-tree__inner' ref={innerRef}>
        {[ ...history, currentNode ].map((node, index) => {
          const NodeComponent = getFromNestedObject(
            customComponents,
            node.component,
            customComponents.default || DialogueNode
          )

          return (
            <NodeComponent
              key={index}
              {...node}
              changeNode={changeNode}
              customScripts={customScripts}
              customComponents={customComponents}
              active={index === history.length}
            />
          )
        })}
      </div>
    </div>
  )
}

function findNode (dialogue, newNodeOrId) {
  if (typeof newNodeOrId === 'object') return newNodeOrId
  return dialogue[newNodeOrId]
}
