import React from 'react'
import DialogueTree from '../src/DialogueTree'
import './styles.css'

export { default as Basic } from './features/Basic.js'
export { default as Options } from './features/Options.js'

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
