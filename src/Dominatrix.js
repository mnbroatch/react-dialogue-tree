// API wrapper for bondage.js

import bondage from 'bondage'
import convertYarn from './convert-yarn'

export default class Dominatrix {
  constructor ({
    dialogue,
    startAt,
    functions,
    variableStorage = new Map(),
    combineTextAndOptionNodes,
    handleCommandResult = () => {},
    onDialogueEnd = () => {}
  }) {
    this.handleCommandResult = handleCommandResult
    this.onDialogueEnd = onDialogueEnd
    this.combineTextAndOptionNodes = combineTextAndOptionNodes
    this.bondage = bondage
    const runner = new bondage.Runner()
    console.log('convertYarn(dialogue)', convertYarn(dialogue))
    runner.load(
      typeof dialogue === 'string'
        ? convertYarn(dialogue)
        : dialogue
    )
    runner.setVariableStorage(variableStorage)
    this.generator = runner.run(startAt)

    // We need to look ahead in order to provide a node with
    // options + text. Looking ahead can trigger a function call
    // earlier than we would like, so we need to queue it.
    this.bufferedNode = null
    this.functionCallQueue = []
    if (functions) {
      Object.entries(functions).forEach(([name, func]) => {
        runner.registerFunction(
          name,
          (...args) => {
            this.functionCallQueue.unshift(() => func(...args))
          }
        )
      })
    }

    this.advance()
  }

  advance (optionIndex) {
    if (
      typeof optionIndex !== 'undefined'
      && this.currentNode
      && this.currentNode.select
    ) {
      this.currentNode.select(optionIndex)
    }

    let next = this.bufferedNode || this.generator.next().value

    while (next instanceof bondage.CommandResult) {
      this.handleCommandResult()
      next = this.generator.next().value
    }

    this.functionCallQueue.forEach((func) => { func() })

    // Lookahead for text + options, and for end of dialogue
    let buffered
    buffered = this.generator.next().value
    if (
      this.combineTextAndOptionNodes
      && next instanceof bondage.TextResult
      && buffered instanceof bondage.OptionsResult
    ) {
      next = { ...next, ...buffered, select: buffered.select.bind(buffered) }
      buffered = null
    } else if (!buffered && !(next instanceof bondage.OptionsResult)) {
      next = { ...next, isDialogueEnd: true }
      this.onDialogueEnd()
    }

    this.currentNode = next
    this.bufferedNode = buffered

    if (!buffered) this.onDialogueEnd()
    return this.currentNode
  }
}
