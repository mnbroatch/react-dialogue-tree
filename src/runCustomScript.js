import getFromNestedObject from '../utilities/getFromNestedObject.js'

export default function runCustomScript (accessPathOrScriptObject, customScripts) {
  //  Normalize input accounting for string convenience syntax
  const scriptObject = typeof accessPathOrScriptObject === 'object'
    ? accessPathOrScriptObject
    : { scriptPath: accessPathOrScriptObject }

  const { scriptPath, not, ...rest } = scriptObject

  const script = getFromNestedObject(customScripts, scriptPath)
  return script && (not ? !script(rest) : script(rest))
}
