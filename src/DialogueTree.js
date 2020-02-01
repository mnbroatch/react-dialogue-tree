import React, { useEffect, useRef } from 'react'
import DialogueNode from './DialogueNode.js'
import ChatScroller from './ChatScroller.js'
import getFromNestedObject from '../utilities/getFromNestedObject.js'

import './styles.css'

export default function DialogueTree ({
  currentNode,
  history,
  makeChoice,
  customComponents = {},
  scrollSpeed = 8
}) {
  return (
    <div className='dialogue-tree'>
      <ChatScroller scrollSpeed={8}>
        {[...history, currentNode].map((node, index) => {
          const NodeComponent = getFromNestedObject(
            customComponents,
            node.component
          )
            || customComponents.default
            || DialogueNode

          return (
            <div className='dialogue-tree__node-spacer' key={index}>
              <div className='dialogue-tree__node-wrapper'>
                <NodeComponent
                  {...node}
                  makeChoice={makeChoice}
                />
              </div>
            </div>
          )
        })}
      </ChatScroller>
    </div>
  )
}
