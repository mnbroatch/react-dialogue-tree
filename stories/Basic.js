import React from 'react'
import DialogueTree from 'react-dialogue-tree'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import sourceCode from '!!raw-loader!./Basic.js'

const dialogue = `title: Start
---
Sally: Test 

-> No, thanks.
    Sally: Aw, ok!
-> I'm good.
    Sally: Let me know!

<<if hello("") is 123>>
    alskdjalskdj
<<else>>
    baslkdjas
<<endif>>

Player: Hi

<<if visited("Sally") is false>>
    Player: Hey, Sally.
    Sally: Oh! Hi.
    Sally: You snuck up on me.
    Sally: Don't do that.
<<else>>
    Player: Hey.
    Sally: Hi.
<<endif>>

<<if not visited("Sally.Watch")>>
    [[Anything exciting happen on your watch?|Sally.Watch]]
<<endif>>

<<if $sally_warning and not visited("Sally.Sorry")>>
    [[Sorry about the console.|Sally.Sorry]]
<<endif>>
[[See you later.|Sally.Exit]]
===

title: Sally.Watch
---
Sally: Not really.
Sally: Same old nebula, doing the same old thing.
Sally: Oh, Ship wanted to see you. Go say hi to it.
<<set $should_see_ship to true>>
<<if visited("Ship") is true>>
    Player: Already done!
    Sally: Go say hi again.
<<endif>>
===

title: Sally.Exit
---
Sally: Bye.
===

title: Sally.Sorry
---
Sally: Yeah. Don't do it again.
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
