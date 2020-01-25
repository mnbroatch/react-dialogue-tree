import getFromNestedObject from '../utilities/getFromNestedObject.js'

// Call to a script can be expressed as a string or object.
// Object allows script to be run with parameters.
export default function runCustomScript (scriptCall, customScripts) {
  const scriptObject = typeof scriptCall === 'object'
    ? scriptCall
    : { test: scriptCall }

  const { test, ...rest } = scriptObject

  const script = getFromNestedObject(customScripts, test)
  return script && script(rest)
}
