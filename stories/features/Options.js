import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Options.js'

const dialogue = `title:Start
tags:cool stuff
---
Red or Blue?
[[Red|Red]]
[[Blue|Blue]]
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
