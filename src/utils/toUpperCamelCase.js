function toUpperCamelCase(inputString) {
  // Divide a string em palavras separadas por "-"
  const words = inputString.split(/[-_]/).filter(Boolean)

  // Capitaliza a primeira letra de cada palavra
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )

  // Junta as palavras sem espaço
  const upperCamelCaseString = capitalizedWords.join('')

  return upperCamelCaseString
}

module.exports = { toUpperCamelCase }
