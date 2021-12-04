import React from 'react'
import DialogueTree from '../src/DialogueTree'
import './styles.css'

export { default as Basic } from './features/Basic.js'
export { default as Options } from './features/Options.js'
export { default as Jump } from './features/Jump.js'
export { default as ShortcutOptions } from './features/ShortcutOptions.js'
export { default as ShortcutConditionals } from './features/ShortcutConditionals.js'

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
