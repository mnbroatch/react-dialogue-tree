import React from 'react'
import DialogueTree from '../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Test.js'

const dialogue = `
title: Start
---
<<if visited("Start")>>
Welcome to the Test conversation!
<<else>>
Let's do something else!
<<endif>>
Which feature should we use?
[[Shortcuts|Shortcuts]]
[[Conditionals|Conditionals]]
[[ConditionalOptions|ConditionalOptions]]
===


title: Shortcuts
---
OK, let's see a shortcut
-> No! Never!
  Haha, made you shortcut
-> Woohoo! When can we start?
  We're already done!
  -> Aw, come on, one more!
    OK, one more nested shortcut, just for you <3.
  -> Good enough!
    Glad you liked it!
[[Start]]
===


title: Conditionals
---
OK, let's see a conditional 
<<if $some_variable is true>>
Ooh, looks like $some_variable is true!
[[Start]]
<<else>>
Hmm, looks like $some_variable is false... I'm gonna set it to true real quick.
<<set $some_variable to true>>
[[Conditionals]]
<<endif>>
===


title: ConditionalOptions
---
So how's the weather been?
[[Actually, I'm not sure yet...|Start]]
<<if $robot_head_0_done is 1>>
[[Hotter than blazes!|Start]]
<<else>>
[[Rabbit Head|Start]]
<<endif>>
===
`

export default function TestDialogueTree () {
  return (
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
          startAt="Start"
          functions={{
            hello: function () { console.log('asd'); return 123 }
          }}
        />
      </div>
    </div>
  )
}
