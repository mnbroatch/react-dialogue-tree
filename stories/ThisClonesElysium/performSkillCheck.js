import { runCustomScript } from 'react-dialogue-tree'

export default function performSkillCheck (customScripts, skillCheck, skills, active) {
  const base = skills[skillCheck.skill].value
  const modifiersTotal = getModifiersTotal(skillCheck.modifiers, customScripts) || 0
  const roll = getRoll(active)

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

function getModifiersTotal (modifiers = [], customScripts) {
  return modifiers.reduce((acc, modifier) => (
    runCustomScript(modifier.if, customScripts)
      ? acc + modifier.value
      : acc
  ), 0)
}

// I don't know how passive skill rolls work. As far as I know they're just
// Magic Passive Disco Number 6
function getRoll (active) {
  return active
    ? Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1)
    : 6 
}
