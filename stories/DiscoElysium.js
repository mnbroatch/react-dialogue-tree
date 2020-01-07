import React, { useState, useEffect } from 'react'
import useInterval from 'react-useinterval'
import DialogueTree, { DialogueNode } from 'react-dialogue-tree'
import SourceCode from './SourceCode.js';
import sourceCode from '!!raw-loader!./DiscoElysium.js'

import './discoElysiumStyles.css'

const firstDialogue = {
  root: {
    character: 'Glowing Box',
    text: 'A bright prism of light beams through the dust-riddled darkness',
    then: {
      character: 'Perception',
      skillCheck: 'perception',
      pass: {
      },
    }
  }
}

const DiscoElysiumDialogueNode = (props) => {
  return (
    <div className='dialogue-node'>
      <span className='dialogue-tree-character'>{props.character.toUpperCase()}</span>-{props.text}
      {props.choices && props.choices.length && (
        <ol className='dialogue-node-choices'>
          {props.choices.map((choice, index) => {
            const choiceCallback = () => {
              if (!chosenChoice) makeChoice(choice)
            }

            return (
              <li
                key={index}
                className='dialogue-node-choices__choice'
                onClick={!chosenChoice ? choiceCallback : undefined}
              >
                {choice.text}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

export default () => {
  const [ dialogue, setDialogue ] = useState(firstDialogue)

  return (
    <div>
      <SourceCode>{sourceCode}</SourceCode>
      <div className={'dialogue-tree-container dialogue-tree-container--disco-elysium'}>

        <DialogueTree
          dialogue={dialogue}
          customComponents={{ default: DiscoElysiumDialogueNode }}
        />

      </div>
    </div>
  )
}
