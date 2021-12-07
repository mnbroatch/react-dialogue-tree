import React from 'react'
import DialogueTree from '../src/DialogueTree'
import './styles.css'

export { default as Basic } from './features/Basic.js'
export { default as Options } from './features/Options.js'
export { default as Jumps } from './features/Jumps.js'
export { default as ShortcutOptions } from './features/ShortcutOptions.js'
export { default as SeparateOptions } from './features/SeparateOptions.js'
export { default as ShortcutConditionals } from './features/ShortcutConditionals.js'
export { default as InlineExpressions } from './features/InlineExpressions.js'
export { default as Variables } from './features/Variables.js'
export { default as Conditionals } from './features/Conditionals.js'
export { default as Commands } from './features/Commands.js'
export { default as Functions } from './features/Functions.js'

export default {
  title: 'DialogueTree',
  component: DialogueTree,
  parameters: { knobs: { escapeHTML: false }, options: { showPanel: false } }
}
