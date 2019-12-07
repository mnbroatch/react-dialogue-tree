export default function getFromNestedObject (object, accessPath, defaultValue) {
  if (!object || !accessPath) return defaultValue
  const pathSegments = accessPath.split('.')

  const toReturn = pathSegments.reduce((acc, segment) => (
    typeof acc === 'object' ? acc[segment] : undefined
  ), object)

  return toReturn === undefined ? defaultValue : toReturn
}
