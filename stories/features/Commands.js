import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Commands.js'

const dialogue = `title:Start
---
About to send a command!
<<someCommand $a "I'm an arg!">>
Command sent!
===`
const handleCommand = result => alert('command:\n' + JSON.stringify(result, null, 2))

export default () => (
  <div className="story">
    <SyntaxHighlighter
      language="jsx"
      className="source-code"
    >
      {sourceCode}
    </SyntaxHighlighter>

    <div className="dialogue-tree-container">
      <DialogueTree
        dialogue={dialogue}
        handleCommand={handleCommand}
        variableStorage={new Map(Object.entries({ a: 1 }))}
      />
    </div>
  </div>
)
