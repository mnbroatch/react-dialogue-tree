import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./ShortcutOptions.js'

const dialogue = `title: Start
---
Pick an option
-> One
  Fun. Once more!
  -> Red
    That's what I said!
  -> Blue
    Says you!
-> Two
  Oh, you. Once more!
  -> Up
    Yup!
  -> Down
    What a clown!
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
