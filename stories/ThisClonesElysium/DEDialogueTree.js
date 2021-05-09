import JSDialogueTree from '../../src/JSDialogueTree.js'

export default class DialogueTree {
  constructor (
    dialogue = {},
    customScripts = {},
    skills = {}
  ) {
    this.treeEngine = new JSDialogueTree(
      dialogue,
      {
        ...customScripts,
        skillCheck: scriptCall => this.performSkillCheck(scriptCall).passed,
        not: scriptCall => !this.runCustomScript(scriptCall.if)
      },
      skills
    )

    this.skills = skills
    this.attemptedActiveChecks = new Map()
    this.passiveCheckStack = []

    this.runCustomScript = this.treeEngine.runCustomScript.bind(this.treeEngine)
  }

  resolveDialogueNode (node) {
    let resolvedNode = this.treeEngine.resolveDialogueNode(node)

    if (resolvedNode.choices && !resolvedNode.passiveChecks) return resolvedNode

    if (resolvedNode.passiveChecks) {
      this.passiveCheckStack.unshift({
        rootChoices: resolvedNode.choices,
        remaining: [ ...resolvedNode.passiveChecks ]
      })
    }

    let currentPassiveCheck
    let next
    let choices
    while (this.passiveCheckStack.length && !next && !choices) {
      currentPassiveCheck = this.passiveCheckStack[0]
      while (currentPassiveCheck.remaining.length && !next) {
        const skillCheck = currentPassiveCheck.remaining.shift()
        const maybeNext = this.resolvePassiveCheck(skillCheck)
        if (maybeNext) {
          next = maybeNext
          choices = null
        }
      }

      if (!next) {
        choices = currentPassiveCheck.rootChoices
        this.passiveCheckStack.shift()
      }
    }
    
    return this.treeEngine.resolveDialogueNode({ ...resolvedNode, next, choices })
  }

  makeChoice (choice) {
    this.treeEngine.runCustomScripts(choice)

    if (choice.activeCheck) {
      const { base, modifiersTotal, passed } = this.performSkillCheck(choice.activeCheck.if, true)
      this.attemptedActiveChecks.set(choice.activeCheck.if, base + modifiersTotal)

      const next = passed ? choice.activeCheck.then : choice.activeCheck.else
      return this.resolveDialogueNode(next)
    }

    return this.resolveDialogueNode(choice.next)
  }

  performSkillCheck (skillCheck, active) {
    const base = this.skills[skillCheck.skill].value
    const modifiersTotal = this.getModifiersTotal(skillCheck.modifiers) || 0
    const roll = this.getRoll(active)

    if (roll === 2) return false
    if (roll === 12) return true

    const total = base + modifiersTotal + roll

    return {
      base,
      modifiersTotal,
      // passed: false,
      passed: total >= skillCheck.difficulty,
      roll,
      total
    }
  }

  getModifiersTotal (modifiers = []) {
    return modifiers.reduce((acc, modifier) => (
      this.runCustomScript(modifier.if)
      ? acc + modifier.value
      : acc
    ), 0)
  }

  // I don't know how passive skill rolls work in DE. As far as I know
  // they're always equal to Magic Passive Disco Number 6
  getRoll (active) {
    return active
      ? Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1)
      : 6
  }

  resolvePassiveCheck (skillCheck) {
    const passed = this.runCustomScript(skillCheck.if)

    if (passed && skillCheck.then) return skillCheck.then
    if (!passed && skillCheck.else) return skillCheck.else
    return null
  }

  isSkillCheckLocked (skillCheck) {
    const { base, modifiersTotal } = this.performSkillCheck(skillCheck)
    const lastAttemptedValue = this.attemptedSkillChecks.get(skillCheck)
    return lastAttemptedValue >= base + modifiersTotal
  }
}