import React from 'react';
import Markdown from 'markdown-to-jsx';
import DialogueTree, { DialogueNode } from '../src/index.js';

const DialogueNodeWithMarkdown = (props) => (
  <DialogueNode
    {...props}
    text={<Markdown>{props.text}</Markdown>}
  />
)

const dialogue = {
  root: {
    text: `
This dialogue uses the **default custom component** feature and [markdown-to-jsx](http://daringfireball.net/projects/markdown/) to interpret markdown in all nodes by default!

It claims to be safe, but I would use it only on trusted input.
    `,
    then: {
      text: `
# Ain't that cool?

Here is

  - some
  - **random**
  - ~~formatting~~

Too much *fun*!
      `,
      then: {
        text: `
OK, enough of that.

Here's the code for the custom component:

    import Markdown from 'markdown-to-jsx';
    import { DialogueNode } from 'react-dialogue-tree';

    const DialogueNodeWithMarkdown = (props) => (
      <DialogueNode
        {...props}
        text={<Markdown>{props.text}</Markdown>}
      />
    )

        `,
        then: {
          text: `
And here's how you set it to be the default for this DialogueTree:

    <div className={'dialogue-tree-container'}>
      <DialogueTree
        dialogue={dialogue}
        customComponents={{
          default: DialogueNodeWithMarkdown
        }}
      />
    </div>

          `
        }
      }
    }
  }
}

export default () => (
  <div className={'dialogue-tree-container'}>
    <DialogueTree
      dialogue={dialogue}
      customComponents={{ default: DialogueNodeWithMarkdown }}
    />
  </div>
)
