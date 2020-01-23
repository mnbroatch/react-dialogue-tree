import React from 'react'
import DialogueTree from 'react-dialogue-tree'
import SourceCode from './SourceCode.js'
import sourceCode from '!!raw-loader!./CustomComponent.js';

const dialogue = {
  root: {
    text: 'The next dialogue node will be a custom component!',
    next: {
      component: 'ButtonDialogueNode',
      text: 'Click to continue the dialogue.',
      next: {
        text: 'And now this is the default node again.'
      }
    }
  }
}

// Our custom component. This is passed to DialogueTree below.
const ButtonDialogueNode = ({ makeChoice, text, chosenChoice, next }) => (
  <button
    onClick={chosenChoice ? undefined : () => { makeChoice({ next }) }}
  >
    {text}
  </button>
)

export default () => (
  <div>
    <SourceCode>{sourceCode}</SourceCode>
    <div className={'dialogue-tree-container'}>

      <DialogueTree
        dialogue={dialogue}
        customComponents={{ ButtonDialogueNode }}
      />

    </div>
  </div>
)
