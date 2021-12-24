import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Functions.js'

const dialogue = `title:Start
---
<<set $apples to 4>>
You have {$apples}  apples. You gain one!
<<set $apples to addOne($apples)>>
You now have {$apples} apples.
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
        functions={{
          addOne: num => +num + 1,
          returnOne: () => 1,
        }}
      />
    </div>
  </div>
)
