import React from 'react';
import DialogueTree from 'react-dialogue-tree'
import SourceCode from './SourceCode.js'
import sourceCode from '!!raw-loader!./Basic.js'

const dialogue = {
  root: {
    text: 'I am a very basic dialogue.',
    next: {
      text: 'Probably not that interesting, right?',
      choices: [
        {
          text: 'Aw, don\'t say that! You\'re doing great!',
          next: {
            text: ':)',
            next: 'end'
          }
        },
        {
          text: 'Yea, you\'re boring! You don\'t even use any advanced features!',
          next: {
            text: ':(',
            next: 'end'
          }
        }
      ]
    }
  },
  end: {
    text: 'Go ahead and check out the other more advanced stories under DialogueTree in the sidebar!'
  }
}

export default () => (
  <div>
    <SourceCode>{sourceCode}</SourceCode>
    <div className={'dialogue-tree-container'}>

      <DialogueTree dialogue={dialogue} />

    </div>
  </div>
)
