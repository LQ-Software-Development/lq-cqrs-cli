function toKebabCase(inputString) {
  // Converte a primeira letra para minúscula
  const firstLetterLowercase = inputString.charAt(0).toLowerCase()

  // Remove a primeira letra da string
  const stringWithoutFirstLetter = inputString.slice(1)

  // Adiciona "-" antes de cada letra maiúscula e converte para minúscula
  const kebabCaseString =
    firstLetterLowercase +
    stringWithoutFirstLetter.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    )

  return kebabCaseString
}

module.exports = { toKebabCase }
