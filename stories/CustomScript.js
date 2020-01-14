import React, { useState, useCallback } from 'react';
import DialogueTree from 'react-dialogue-tree'
import SourceCode from './SourceCode.js'
import sourceCode from '!!raw-loader!./CustomScript.js'

const dialogue = {
  root: {
    text: 'This dialogue increments a count every time you reach the chooseColor node. It updates the backgroundColor when you choose a color.',
    then: 'chooseColor'
  },
  chooseColor: {
    text: 'What color background do you prefer?',
    scripts: ['incrementCount'],
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
  const [count, setCount] = useState(0)

  const changeBackgroundColor = useCallback((node) => {
    setBackgroundColor(node.color)
  }, [])

  const incrementCount = useCallback((node) => {
    setCount(count + 1)
  }, [count])

  return (
    <div style={{ backgroundColor, display: 'inline-block', minWidth: '100%' }}>
      <SourceCode>{sourceCode}</SourceCode>
      <div className={'dialogue-tree-container dialogue-tree-container--custom-script'}>
        {count > 0 && (
          <div style={{ padding: 12, backgroundColor: '#eee' }}>
            You've faced this decision {count} time{count > 1 && 's'}!
          </div>
        )}

        <DialogueTree
          dialogue={dialogue}
          customScripts={{ changeBackgroundColor, incrementCount }}
        />

      </div>
    </div>
  )
}
