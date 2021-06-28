import React from 'react'
import DialogueTree from '../src/DialogueTree'
import './styles.css'

export { default as Test } from './Test.js'
export { default as Basic } from './Basic.js'

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
