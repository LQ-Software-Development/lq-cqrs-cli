function resolveResourceName(parameters) {
  const { first, second, options = {} } = parameters

  if (first === 'service' && second) {
    return { name: second, type: 'service' }
  }

  const type = options.type || options.t || null
  return { name: first, type }
}

module.exports = { resolveResourceName }
