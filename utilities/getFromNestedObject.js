export default function getFromNestedObject (object, accessPath, defaultValue) {
  if (!accessPath) return defaultValue
  const pathSegments = accessPath.split('.')

  const toReturn = pathSegments.reduce((acc, segment) => (
    typeof acc === 'undefined' ? acc : acc[segment]
  ), object)

  return typeof toReturn === 'undefined' ? defaultValue : toReturn
}
