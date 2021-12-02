import React, { useState } from 'react'
import DialogueTree from '../src/DialogueTreeContainer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Test.js'

const dialogue = `
title: Start
---
<<if $visited_start is true>>
Let's do something else!
<<else>>
Welcome to the Test conversation!
<<set $visited_start to true>>
<<endif>>
Which feature should we use?
[[Shortcuts|Shortcuts]]
[[Conditionals|Conditionals]]
[[Conditional Options|ConditionalOptions]]
[[Conditional Shortcut Options|ConditionalShortcutOptions]]
[[Dialogue End|End]]
===


title: End
---
Are you sure?
-> No, I don't want to lose everything!
  [[Start]]
-> Yea, I wanted to start over anyway.
  If this text isn't here, the dialogue crashes.
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
Hmm, looks like $some_variable is false... I'm gonna set it to true real quick and rerun this node.
<<set $some_variable to true>>
[[Conditionals]]
<<endif>>
===


title: ConditionalOptions
---
Would you like to revisit any nodes?
-> Shortcuts <<if visited("Shortcuts")>>
  a
  [[Shortcuts]]
-> I haven't seen any others! <<if not visited("Shortcuts") and not visited("Conditionals") and not visited("ConditionalShortcutOptions")>>
  Oh, ok. Back to the start with ye!
  [[Start]]
-> Not really <<if visited("Shortcuts") or visited("Conditionals") or visited("ConditionalShortcutOptions")>>
  OK
  [[Start]]
asdasd
===


title: ConditionalShortcutOptions
---
What's the best feature you've seen so far?
-> Conditionals! <<if visited("Conditionals")>>
  Nice.
-> ConditionalOptions! <<if visited("ConditionalOptions")>>
  Nice.
-> Shortcuts! <<if visited("Shortcuts")>>
  Nice.
-> I haven't seen any others <<if not visited("Shortcuts") and not visited("Conditionals") and not visited("ConditionalOptions")>>
  Nice.
If this text isn't here, the dialogue crashes :(.
[[Start]]
===
`

export default function TestDialogueTree () {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="story">
      <SyntaxHighlighter
        language="jsx"
        className="source-code"
      >
        {sourceCode}
      </SyntaxHighlighter>

      <div className="dialogue-tree-container">
        {isOpen
          ? <DialogueTree
              dialogue={dialogue}
              startAt="Start"
              onDialogueEnd={() => { setIsOpen(false) }}
            />
          : <button
              className="reset-button"
              onClick={() => { setIsOpen(true) }}
            >
              Reset
            </button>
      }
      </div>
    </div>
  )
}
