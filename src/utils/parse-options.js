function flagIsTrue(value) {
  if (value === undefined || value === null) return false
  if (value === true) return true
  const normalized = String(value).toLowerCase()
  return normalized === 'true' || normalized === '1' || normalized === ''
}

function parseOptions(toolbox) {
  const { options } = toolbox.parameters

  return {
    module: options.module || options.m,
    type: options.type || options.t,
    cqrs: options.cqrs,
    http: options.http || options.method,
    noInteractive:
      flagIsTrue(options['no-interactive'] ?? options.nonInteractive) ||
      options.interactive === false,
    domain: flagIsTrue(options.domain),
    repository: flagIsTrue(options.repository),
    inMemory: flagIsTrue(options['in-memory'] ?? options.inMemory),
    format: options.format || 'text',
    dryRun: flagIsTrue(options['dry-run'] ?? options.dryRun),
    specs: flagIsTrue(options.specs),
  }
}

module.exports = { parseOptions, flagIsTrue }
