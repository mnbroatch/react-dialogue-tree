import React from 'react';
import { forceReRender } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import Markdown from 'markdown-to-jsx';
import DialogueTree, { DialogueNode } from './index.js';

import './styles.stories.css'

//  https://coolors.co/616163-fddd9b-929487-a1b0ab-c3dac3

const DialogueNodeWithMarkdown = (props) => (
  <DialogueNode
    {...props}
    text={<Markdown>{props.text}</Markdown>}
  />
)

export const BasicDialogue = () => (
  <div className={'dialogue-tree-container'}>
    <DialogueTree
      dialogue={{
        "root": {
          "text": "hello",
          "then": "world"
        },
        "world": {
          "text": "**world**"
        }
      }}
      customComponents={{ default: DialogueNodeWithMarkdown }}
    />
  </div>
)

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  decorators: [withKnobs],
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
