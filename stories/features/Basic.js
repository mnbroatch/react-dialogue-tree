import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Basic.js'

const dialogue = `title:Start
---
I am a line
I am a second line
I am a third line
I am a fourth line
I am a fifth line
I am a sixth line
I am the last line!
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
