export default function percentToHexColor (percent) {
  const hexNumber = Math.floor(((percent + 1) * 16777215) / 2).toString(16)
  return `#${('000000' + hexNumber).slice(-6)}`
}
