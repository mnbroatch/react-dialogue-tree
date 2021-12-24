import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Options.js'

const dialogue = `title:Start
---
Red or Blue?
-> Red
  <<jump Red>>
-> Blue
  <<jump Blue>>
===

title:Red
---
You picked Red!
===

title:Blue
---
You picked Blue!
===
`

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
