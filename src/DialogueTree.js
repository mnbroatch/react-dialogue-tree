import React, { useEffect, useRef } from 'react'
import DialogueNode from './DialogueNode.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

import './styles.css'

export default function DialogueTree ({
  currentNode,
  history,
  makeChoice,
  customComponents = {},
  customScripts = {},
  scrollSpeed = 8
}) {
  const innerRef = useRef()

  useEffect(() => {
    if (!innerRef.current || !innerRef.current.lastChild) return

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
        {[...history, currentNode].map((node, index) => {
          const NodeComponent = getFromNestedObject(
            customComponents,
            node.component,
            customComponents.default || DialogueNode
          )

          // can we just use last of type or something without adding class here?
          const nodeWrapperClass = index === history.length
            ? 'dialogue-tree__node-wrapper dialogue-tree__node-wrapper--active'
            : 'dialogue-tree__node-wrapper'

          return (
            <div className='dialogue-tree__node-spacer' key={index}>
              <div className={nodeWrapperClass}>
                <NodeComponent
                  {...node}
                  makeChoice={makeChoice}
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
