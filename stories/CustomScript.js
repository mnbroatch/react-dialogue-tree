import React, { useState, useCallback } from 'react'
import DialogueTree from '../src/index.js'

const dialogue = {
  root: {
    text: 'This dialogue increments a counter every time you reach the chooseColor node. It updates the backgroundColor when you choose a color.',
    then: 'chooseColor'
  },
  chooseColor: {
    text: 'What color background do you prefer?',
    scripts: ['incrementCounter'],
    choices: [
      {
        text: 'Yellow',
        scripts: ['changeBackgroundColor'],
        color: '#FCFDAF',
        then: 'chooseColor'
      },
      {
        text: 'Blue',
        scripts: ['changeBackgroundColor'],
        color: '#BFD7EA',
        then: 'chooseColor'
      },
      {
        text: 'Red',
        scripts: ['changeBackgroundColor'],
        color: '#D1462F',
        then: {
          text: 'Hmm, red doesn\'t work so well, does it?',
          then: 'chooseColor'
        }
      },
      {
        text: 'White',
        scripts: ['changeBackgroundColor'],
        color: '#FFF',
        then: {
          text: 'Back to the basics!',
          then: 'chooseColor'
        }
      }
    ]
  }
}

export default () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFF')
  const [counter, setCounter] = useState(0)

  const changeBackgroundColor = useCallback((node) => {
    setBackgroundColor(node.color)
  }, [])

  const incrementCounter = useCallback((node) => {
    setCounter(counter + 1)
  }, [counter])

  return (
    <div style={{ backgroundColor, height: '100%' }}>
      <div className={'dialogue-tree-container'}>

        {counter > 0 && (
          <div style={{ padding: 12, backgroundColor: '#eee' }}>
            You've faced this decision {counter} times!
          </div>
        )}

        <DialogueTree
          dialogue={dialogue}
          customScripts={{ changeBackgroundColor, incrementCounter }}
        />

      </div>
    </div>
  )
}
