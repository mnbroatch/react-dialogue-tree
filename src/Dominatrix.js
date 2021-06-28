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
    onConversationEnd = () => {}
  }) {
    this.handleCommandResult = handleCommandResult
    this.onConversationEnd = onConversationEnd
    this.combineTextAndOptionNodes = combineTextAndOptionNodes
    this.bondage = bondage
    const runner = new bondage.Runner()
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

    // If we look ahead and see a text node, we need to handle it
    // next time advance() is called (instead of advancing the generator).
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

    if (this.bufferedNode) {
      this.currentNode = this.bufferedNode
      this.bufferedNode = null
    } else {
      this.currentNode = this.generator.next().value
    }

    if (
      this.combineTextAndOptionNodes
      && this.currentNode instanceof bondage.TextResult
    ) {
      this.currentNode = this.resolveTextNode()
    } else if (this.currentNode instanceof bondage.CommandResult) {
      this.handleCommandResult()
    }

    this.functionCallQueue.forEach((func) => { func() })
    if (!this.currentNode) this.onConversationEnd()
    return this.currentNode
  }

  resolveTextNode () {
    let next = this.generator.next().value
    while (next) {
      if (next instanceof bondage.OptionsResult) {
        return { ...this.currentNode, ...next, select: next.select.bind(next) }
      } else if (next instanceof bondage.TextResult) {
        this.bufferedNode = next
        return this.currentNode
      } else if (next instanceof bondage.CommandResult) {
        this.handleCommandResult()
        next = this.generator.next().value
      }
    }
  }
}
