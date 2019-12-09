import React, { useState, useCallback } from 'react';
import DialogueTree from '../src/index.js';

const dialogue = {
  root: {
    text: 'What color background do you prefer?',
    choices: [
      {
        text: 'Red',
        script: 'changeBackgroundColor',
        color: '#D1462F',
        then: 'root'
      },
      {
        text: 'Yellow',
        script: 'changeBackgroundColor',
        color: '#FCFDAF',
        then: 'root'
      },
      {
        text: 'Blue',
        script: 'changeBackgroundColor',
        color: '#BFD7EA',
        then: 'root'
      },
      {
        text: 'White',
        script: 'changeBackgroundColor',
        color: '#FFF',
        then: 'root'
      }
    ]
  }
}

export default () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFF')
  const changeBackgroundColor = useCallback((node) => {
    setBackgroundColor(node.color)
  }, [])

  return (
    <div style={{ backgroundColor, height: '100%' }}>
      <div className={'dialogue-tree-container'}>

        <DialogueTree
          dialogue={dialogue}
          customScripts={{ changeBackgroundColor }}
        />

      </div>
    </div>
  )
}
