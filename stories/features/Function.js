import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Basic.js'

const dialogue = `title: Start
otherMetaData: thing
---
I am a node

I am a second node
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
          hello: function () { console.log('asd'); return 123 }
        }}
      />

    </div>
  </div>
)
