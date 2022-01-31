import React, { useRef, useEffect } from 'react'
import DialogueTree from '../src/index'
import { ErrorBoundary } from 'react-error-boundary'
import './styles.css'

const dialogue = `title: Start
---
I am a line
-> I am an option
  I am the line after the first option!
-> I am a second option
  I am the line after the second option!
-> I am a disabled option<<if false is true>>
  X
I am another line. Today's date is {getTodaysDate()}
===`

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  args: {
    dialogue,
    functions: {
      getTodaysDate: () => new Date()
    }
  },
  argTypes: {
    dialogue: {
      control: 'text'
    }
  }
}

const Template = (props) => {
  return (
    <div className="story">
      <div className="dialogue-tree-container">
        <ErrorBoundary
          resetKeys={[props.dialogue]}
          fallbackRender={({ error }) => {
            return (
              <div>
                Invalid Dialogue: {error.message}
              </div>
            )
          }}
        >
          <DialogueTree
            {...props}
            onDialogueEnd={() => { alert('onDialogueEnd called') }}
          />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export const Basic = Template.bind({})
