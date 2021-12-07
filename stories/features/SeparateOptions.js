import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./SeparateOptions.js'

const dialogue = `title:Start
---
What color? Hit "Next" to see the choices.
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
      <DialogueTree
        dialogue={dialogue}
        combineTextAndOptionNodes={false}
      />
    </div>
  </div>
)
