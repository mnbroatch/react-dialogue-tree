// API wrapper for bondage.js

import bondage from 'bondage'
import convertYarn from './convert-yarn'

export default class Dominatrix {
  constructor ({
    dialogue,
    startAt,
    combineTextAndOptionNodes = true,
    variableStorage = new Map(),
    functions = {},
    handleCommand = () => {},
    onDialogueEnd = () => {}
  }) {
    // temporary? https://github.com/alforno/bondage.js/issues/1
    variableStorage.display = variableStorage.get

    this.handleCommand = handleCommand
    this.onDialogueEnd = onDialogueEnd
    this.combineTextAndOptionNodes = combineTextAndOptionNodes
    this.bondage = bondage
    const runner = new bondage.Runner()
    runner.load(
      typeof dialogue === 'string'
        ? convertYarn(dialogue)
        : dialogue
    )
    runner.setVariableStorage(variableStorage)
    Object.entries(functions)
      .forEach((entry) => { runner.registerFunction(...entry) })
    this.generator = runner.run(startAt)

    // We need to look ahead in order to merge options + text results.
    this.bufferedNode = null

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
    let buffered = null

    while (next instanceof bondage.CommandResult) {
      this.handleCommand(next)
      next = this.generator.next().value
    }

    // Lookahead for combining text + options, and for end of dialogue.
    // Can't look ahead of option nodes (what would you look ahead at?)
    if (!(next instanceof bondage.OptionsResult)) {
      buffered = this.generator.next().value
      if (
        this.combineTextAndOptionNodes
        && buffered instanceof bondage.OptionsResult
      ) {
        next = { ...next, ...buffered, select: buffered.select.bind(buffered) }
        buffered = null
      } else if (!buffered) {
        next = { ...next, isDialogueEnd: true }
      }
    }

    this.currentNode = next
    this.bufferedNode = buffered
    if (this.currentNode.isDialogueEnd) this.onDialogueEnd()
  }
}
