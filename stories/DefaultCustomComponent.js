import React, { useState, useEffect } from 'react'
import useInterval from 'react-useinterval'
import DialogueTree, { DialogueNode } from 'react-dialogue-tree'
import SourceCode from './SourceCode.js';
import sourceCode from '!!raw-loader!./DefaultCustomComponent.js'

const dialogue = {
  root: {
    text: 'This dialogue uses the "default custom component" feature to add a typing animation to every prompt!',
    next: {
      text: 'It works whether a node has choices or not!',
      choices: [
        {
          text: 'Hooray! Again!',
          next: 'root'
        },
        {
          text: 'That\'s nice.',
          next: {
            text: 'It certainly is.'
          }
        }
      ]
    }
  }
}

// Our custom component. This is passed as the default to DialogueTree below.
const DialogueNodeWithTypingAnimation = (props) => (
  <DialogueNode
    {...props}
    text={<TypingAnimation delay={20}>{props.text}</TypingAnimation>}
  />
)

export default () => (
  <div>
    <SourceCode>{sourceCode}</SourceCode>
    <div className={'dialogue-tree-container'}>

      <DialogueTree
        dialogue={dialogue}
        customComponents={{ default: DialogueNodeWithTypingAnimation }}
      />

  </div>
</div>
)

// The guts of the typing animation
function TypingAnimation ({ children, delay }) {
  if (typeof children !== 'string') return null

  const [ charactersSoFar, setCharactersSoFar ] = useState(children[0])
  const isFinished = charactersSoFar.length === children.length

  useInterval(() => {
    setCharactersSoFar(children.slice(0, charactersSoFar.length + 1))
  }, isFinished ? null : delay)

  useEffect(() => { setCharactersSoFar(children[0]) }, [children])

  return charactersSoFar
}
