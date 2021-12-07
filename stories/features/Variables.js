import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Variables.js'

const dialogue = `title:Start
---
The value of variable $a is {$a}
<<set $a to 3>>
Now the value of variable $a has changed to {$a}!
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
      <DialogueTree
        dialogue={dialogue}
        variableStorage={new Map(Object.entries({ a: 1 }))}
      />
    </div>
  </div>
)
