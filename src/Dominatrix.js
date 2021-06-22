// API wrapper for bondage.js

import bondage from 'bondage'
import convertYarn from './convert-yarn'

export default class Dominatrix {
  constructor (
    dialogue,
    startAt,
    functions,
    variableStorage = new Map()
  ) {
    const runner = new bondage.Runner()
    runner.load(
      typeof dialogue === 'string'
        ? convertYarn(dialogue)
        : dialogue
    )
    runner.setVariableStorage(variableStorage)
    if (functions) {
      Object.entries(functions).forEach(([name, func]) => {
        runner.registerFunction(name, func)
      })
    }
    this.generator = runner.run(startAt)
    this.currentNode = this.generator.next().value
    this.bondage = bondage
  }

  advance (option) {
    if (this.currentNode instanceof bondage.OptionsResult && option) {
      console.log('this.currentNode.options.indexOf(option)', this.currentNode.options.indexOf(option))
      this.currentNode.select(
        this.currentNode.options.indexOf(option)
      )
    }

    if (this.currentNode instanceof bondage.CommandResult) {
      // gotta figure this out still
    }

    this.currentNode = this.generator.next().value
    console.log('this.currentNode ', this.currentNode)
    return this.currentNode
  }
}
