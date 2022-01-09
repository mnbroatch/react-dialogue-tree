import React from 'react'
import DialogueTree from '../src/DialogueTreeContainer'
import './styles.css'

const dialogue = `title: Start
---
I am a line
I am a second line
I am a third line
I am a fourth line
I am a fifth line
I am a sixth line
I am the last line!
===`

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  args: { dialogue },
  argTypes: {
    dialogue: {
      control: 'text'
    }
  }
}

export const Template = (props) => {
  return (
    <div className="story">
      <div className="dialogue-tree-container">
        <DialogueTree
          {...props}
        />
      </div>
    </div>
  )
}

export const Basic = Template.bind({})
