const { toUpperCamelCase } = require('./toUpperCamelCase')

function toCamelCase(inputString) {
  const upperCamel = toUpperCamelCase(inputString)
  return upperCamel.charAt(0).toLowerCase() + upperCamel.slice(1)
}

module.exports = { toCamelCase }
