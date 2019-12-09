import React, { useState, useEffect, useCallback, useRef } from 'react'
import DialogueNode from './DialogueNode.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

import './styles.css'

export default function DialogueTree ({
  dialogue,
  customComponents = {},
  customScripts = {}
}) {
  if (!dialogue || !dialogue.root) {
    console.error('DialogueTree requires a "dialogue" object with a "root" property')
    return null
  }

  const [ history, setHistory ] = useState([])
  const [ currentNode, setCurrentNode ] = useState(dialogue.root)
  const innerRef = useRef()

  const goToNode = useCallback((choice) => {
    const newNode = findNode(dialogue, choice.then)
    setHistory([ ...history, { ...currentNode, chosenChoice: choice } ])
    setCurrentNode(newNode)
  })

  useEffect(() => {
    innerRef.current.lastChild.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div className='dialogue-tree'>
      <div className='dialogue-tree__inner' 
        ref={innerRef}
        style={{
          height: '100%',
          overflowY: 'auto'
        }}
      >
        {[ ...history, currentNode ].map((node, index) => {
          const NodeComponent = getFromNestedObject(
            customComponents,
            node.component,
            customComponents.default || DialogueNode
          )

          const active = index === history.length

          const nodeWrapperClass = active
            ? 'dialogue-tree__node-wrapper dialogue-tree__node-wrapper--active'
            : 'dialogue-tree__node-wrapper'

          //  Node spacer has top padding so there's some headroom
          //  when we scroll to the latest node automatically.
          return (
            <div className='dialogue-tree__node-spacer' key={index}>
              <div className={nodeWrapperClass}>
                <NodeComponent
                  {...node}
                  goToNode={goToNode}
                  customScripts={customScripts}
                  customComponents={customComponents}
                  active={active}
                />
              </div>
            </div>
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
