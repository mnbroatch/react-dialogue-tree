import React from 'react'
import DialogueNode from './DialogueNode.js'
import ChatScroller from './ChatScroller.js'

export default function DialogueTree ({
  currentResult,
  history,
  advance,
  defaultOption,
}) {
  const nodes = currentResult ? [...history, currentResult] : history
  return (
    <div className='dialogue-tree'>
      <ChatScroller scrollSpeed={8}>
        {nodes.map((node, index) => node && (
          <div className='dialogue-tree__node-spacer' key={index}>
            <div className='dialogue-tree__node-wrapper'>
              <DialogueNode
                node={node}
                advance={advance}
                defaultOption={defaultOption}
                isHistory={history.includes(node)}
              />
            </div>
          </div>
        ))}
      </ChatScroller>
    </div>
  )
}
