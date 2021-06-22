import React from 'react'
import DialogueNode from './DialogueNode.js'
import ChatScroller from './ChatScroller.js'

import './styles.css'

export default function DialogueTree ({
  currentNode,
  history,
  advance
}) {
  return (
    <div className='dialogue-tree'>
      <ChatScroller scrollSpeed={8}>
        {[...history, currentNode].map((node, index) => node && (
          <div className='dialogue-tree__node-spacer' key={index}>
            <div className='dialogue-tree__node-wrapper'>
              <DialogueNode
                node={node}
                advance={advance}
              />
            </div>
          </div>
        ))}
      </ChatScroller>
    </div>
  )
}
