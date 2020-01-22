import { runCustomScript } from 'react-dialogue-tree'

export default function performSkillCheck (customScripts, skillCheck, gameState, active) {
  let total = gameState.skills[skillCheck.skill]
  if (skillCheck.modifiers) {
    total += skillCheck.modifiers.reduce((acc, modifier) => (
      modifier.if.every(test => runCustomScript(test, customScripts))
        ? acc + modifier.values
        : acc
    ), 0)
  }

  const roll = active
    ? Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1)
    : 6 // Magic Passive Disco Number

  if (roll === 2) return false
  if (roll === 12) return true
  total += roll

  console.log('total', total)
  return total >= skillCheck.difficulty
}
