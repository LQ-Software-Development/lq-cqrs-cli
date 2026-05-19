function toKebabCase(inputString) {
  if (inputString.includes('_')) {
    return inputString.replace(/_/g, '-').toLowerCase()
  }

  if (inputString.includes('-')) {
    return inputString.toLowerCase()
  }

  const firstLetterLowercase = inputString.charAt(0).toLowerCase()
  const stringWithoutFirstLetter = inputString.slice(1)

  return (
    firstLetterLowercase +
    stringWithoutFirstLetter.replace(
      /[A-Z]/g,
      (match) => `-${match.toLowerCase()}`
    )
  )
}

module.exports = { toKebabCase }
