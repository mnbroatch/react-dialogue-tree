import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./InlineExpressions.js'

const dialogue = `title:Start
---
1 + 1 is {1 + 1} and that's cool
===`

export default () => (
  <div className="story">
    <SyntaxHighlighter
      language="jsx"
      className="source-code"
    >
      {sourceCode}
    </SyntaxHighlighter>

    <div className="dialogue-tree-container">
      <DialogueTree dialogue={dialogue} />
    </div>
  </div>
)
