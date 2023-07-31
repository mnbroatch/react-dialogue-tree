import React from 'react'
import PropTypes from 'prop-types'
import { DialogueNode } from './index.js'
import ChatScroller from './ChatScroller.js'

export default function DialogueTree ({
  currentResult,
  history,
  advance,
  defaultOption,
  finalOption,
  customNode
}) {
  const nodes = currentResult ? [...history, currentResult] : history
  const NodeComponent = customNode || DialogueNode
  return (
    <div className='dialogue-tree'>
      <ChatScroller scrollSpeed={8}>
        {nodes
          .filter(node => typeof node.command === 'undefined')
          .map((node, index) => node && (
            <div
              className='dialogue-tree__node-spacer'
              key={index}
            >
              <div className='dialogue-tree__node-wrapper'>
                <NodeComponent
                  node={node}
                  advance={advance}
                  defaultOption={defaultOption}
                  finalOption={finalOption}
                  isHistory={history.includes(node)}
                />
              </div>
            </div>
          ))}
      </ChatScroller>
    </div>
  )
}

const node = PropTypes.shape({
  text: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    isAvailable: PropTypes.bool
  })),
  selected: PropTypes.number,
  isDialogueEnd: PropTypes.bool
})

DialogueTree.propTypes = {
  currentResult: node,
  history: PropTypes.arrayOf(node),
  advance: PropTypes.func,
  defaultOption: PropTypes.string,
  finalOption: PropTypes.string,
  customNode: PropTypes.elementType
}
