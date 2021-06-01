import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default class DialogueTree {
  constructor (
    dialogue = {},
    customScripts = {},
    defaultChoiceText = 'Continue'
  ) {
    this.dialogue = dialogue
    this.customScripts = customScripts
    this.defaultChoiceText = defaultChoiceText
  }

  resolveNode (node) {
    if (!node) return node

    let resolvedNode = node
    while (typeof resolvedNode === 'string' || resolvedNode.if) {
      resolvedNode = this.resolveNodePath(resolvedNode)
      resolvedNode = this.resolveConditionalNode(resolvedNode)
    }

    return resolvedNode
  }

  // Todo: check runCustomScripts timing
  resolveDialogueNode (node) {
    let resolvedNode = this.resolveNode(node)
    this.runCustomScripts(resolvedNode)

    if (resolvedNode.choices) {
      resolvedNode = {
        ...resolvedNode,
        choices: this.resolveChoicesNode(resolvedNode.choices)
      }
    }

    if (!resolvedNode.choices && resolvedNode.next) {
      resolvedNode = {
        ...resolvedNode,
        choices: [{ next: resolvedNode.next, text: this.defaultChoiceText, isDefault: true }]
      }
    }

    return resolvedNode
  }

  resolveConditionalNode (node) {
    if (!node.if) return node

    return this.runCustomScript(node.if)
      ? this.resolveConditionalNode(node.then)
      : this.resolveConditionalNode(node.else)
  }

  // Resolving choices separately allows reuse of a set of
  // choices across multiple nodes.
  resolveChoicesNode (node) {
    const choicesNode = this.resolveNode(node)
    return choicesNode && choicesNode.filter(choice =>
      !choice.hideIf || !this.runCustomScript(choice.hideIf)
    )
  }

  resolveNodePath (nodeOrPath) {
    if (typeof nodeOrPath === 'object') return nodeOrPath
    return getFromNestedObject(this.dialogue, nodeOrPath)
  }

  runCustomScripts (node) {
    if (node && node.scripts) {
      node.scripts.forEach((scriptCall) => {
        this.runCustomScript(scriptCall)
      })
    }
  }

  runCustomScript (scriptCall) {
    // Normalize shorthand where scriptCall is a string
    const scriptCallObject = typeof scriptCall === 'object'
      ? scriptCall
      : { test: scriptCall }

    const script = getFromNestedObject(this.customScripts, scriptCallObject.test)
    return script && script(scriptCallObject, this)
  }

  makeChoice (choice) {
    this.runCustomScripts(choice)
    return this.resolveDialogueNode(choice.next)
  }
}
