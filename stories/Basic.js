import React from 'react';
import Markdown from 'markdown-to-jsx';
import DialogueTree from '../src/index.js';
import basicDialogueSource from 'raw-loader!./Basic.js';

const dialogue = {
  root: {
    text: 'I am a very basic dialogue.',
    then: {
      text: 'Probably not that interesting, right?',
      choices: [
        {
          text: 'Aw, don\'t say that! You\'re doing great!',
          then: {
            text: ':)',
            then: 'end'
          }
        },
        {
          text: 'Yea, you\'re boring! You don\'t even use any advanced features!',
          then: {
            text: ':(',
            then: 'end'
          }
        }
      ]
    }
  },
  end: {
    text: 'Go ahead and check out the other stories under DialogueTree in the sidebar!'
  }
}

export default () => (
  <div>
    <pre>{basicDialogueSource}</pre>
    <div className={'dialogue-tree-container'}>
      <DialogueTree dialogue={dialogue} />
    </div>
  </div>
)
