import React from 'react';
import { forceReRender } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import DialogueTree from './index.js';
import RainbowWaveAnimation from '../RainbowWaveAnimation';

import './styles.stories.css'

//  https://coolors.co/616163-fddd9b-929487-a1b0ab-c3dac3

export const Basic Dialogue = () => (
  <div className={'dialogue-tree-container'}>
    <DialogueTree
      dialogue={{
        "root": {
          "text": "hello",
          "then": "world"
        },
        "world": {
          "text": "world"
        }
      }}
    />
  </div>
)

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  decorators: [withKnobs],
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
