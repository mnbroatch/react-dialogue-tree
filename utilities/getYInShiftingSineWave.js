export default function getYInShiftingSineWave (
  x,
  elapsedTime,
  frequency = 1,
  wavelength = 1,
  amplitude = 1
) {
  const percentX = x / wavelength
  const phaseShift = (elapsedTime / 1000) * frequency
  const theta = (percentX + phaseShift) * (2 * Math.PI)
  return Math.sin(theta) * amplitude
}
