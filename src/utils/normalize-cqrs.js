function normalizeCqrsFolder(cqrs) {
  if (!cqrs) return null

  const value = String(cqrs).toLowerCase()

  if (value === 'command' || value === 'commands') return 'commands'
  if (value === 'query' || value === 'queries') return 'queries'

  throw new Error(
    `Valor --cqrs inválido: ${cqrs}. Use: command, commands, query ou queries`
  )
}

module.exports = { normalizeCqrsFolder }
