import React from 'react'
import DialogueTree from '../../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Conditionals.js'

const dialogue = `title:Start
---
Pick one:
-> Dwarves in Snow White
  <<set $expected to 7>>
-> Ninja Turtles
  <<set $expected to 4>>
-> Simpson children
  <<set $expected to 3>>

How many are there?
-> 3
  <<set $guess to 3>>
-> 4
  <<set $guess to 4>>
-> 7
  <<set $guess to 7>>

<<if $guess eq $expected>>
  That's right!
<<else>>
  That's wrong!
<<endif>>

[[Start]]
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
