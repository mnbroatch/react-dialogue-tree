import React from 'react';
import DialogueTree from '../src/index.js';

const ButtonDialogueNode = ({ goToNode, text, chosenChoice, then }) => (
  <button
    onClick={() => { if (!chosenChoice) goToNode({ then }) }}
  >
    {text}
  </button>
)

const dialogue = {
  root: {
    text: 'The next dialogue node will be a custom component!',
    then: {
      component: 'ButtonDialogueNode',
      text: 'Click to continue the dialogue.',
      then: {
        text: 'And now this is the default node again.'
      }
    }
  }
}

export default () => (
  <div className={'dialogue-tree-container'}>
    <DialogueTree
      dialogue={dialogue}
      customComponents={{ ButtonDialogueNode }}
    />
  </div>
)
