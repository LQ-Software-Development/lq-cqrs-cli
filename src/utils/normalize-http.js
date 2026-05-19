const HTTP_METHODS = ['Get', 'Post', 'Put', 'Patch', 'Delete']

function normalizeHttpMethod(method) {
  if (!method) return 'Post'

  const normalized =
    method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()

  if (!HTTP_METHODS.includes(normalized)) {
    throw new Error(
      `Método HTTP inválido: ${method}. Use: ${HTTP_METHODS.join(', ')}`
    )
  }

  return normalized
}

module.exports = { normalizeHttpMethod, HTTP_METHODS }
