import React, { useState, useEffect, useCallback, useRef } from 'react'
import DialogueNode from './DialogueNode.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

import './styles.css'

export default function DialogueTree ({
  dialogue,
  startAt = dialogue.root,
  customComponents = {},
  customScripts = {},
  scrollSpeed = 8
}) {
  if (!dialogue || !dialogue.root) {
    console.error('DialogueTree requires a "dialogue" object with a "root" property')
    return null
  }

  const [ history, setHistory ] = useState([])
  const [ currentNode, setCurrentNode ] = useState(startAt)
  const innerRef = useRef()

  const goToNode = useCallback((choice) => {
    const newNode = findNode(dialogue, choice.then)
    if (!newNode) console.error(`Tried going to this missing node: ${choice.then}`)

    setHistory([ ...history, { ...currentNode, chosenChoice: choice } ])
    setCurrentNode(newNode)
  }, [history, currentNode])

  useEffect(() => {
    const scrollEnd = innerRef.current.scrollHeight
      - Math.max(
        innerRef.current.lastChild.offsetHeight,
        innerRef.current.offsetHeight
      )

    const animate = () => {
      innerRef.current.scrollTop += scrollSpeed
      if (innerRef.current.scrollTop < scrollEnd) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [currentNode, innerRef.current && innerRef.current.lastChild])

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

          const nodeWrapperClass = index === history.length
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
