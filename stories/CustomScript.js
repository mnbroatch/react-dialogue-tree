import React, { useState, useCallback } from 'react';
import DialogueTree from '../src/index.js';

const dialogue = {
  root: {
    text: 'What color background do you prefer?',
    choices: [
      {
        text: 'Red',
        script: 'setBackgroundColor',
        color: '#D1462F',
        then: 'root'
      },
      {
        text: 'Yellow',
        script: 'setBackgroundColor',
        color: '#FCFDAF',
        then: 'root'
      },
      {
        text: 'Blue',
        script: 'setBackgroundColor',
        color: '#BFD7EA',
        then: 'root'
      }
    ]
  }
}

export default () => {
  const [backgroundColor, setBackgroundColor] = useState('yellow')

  return (
    <div
      className={'dialogue-tree-container'}
      styles={{ backgroundColor }}
    >
      <DialogueTree
        dialogue={dialogue}
        customScripts={{ setBackgroundColor }}
      />
    </div>
  )
}
