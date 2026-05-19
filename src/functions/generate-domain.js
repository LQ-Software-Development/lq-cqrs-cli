const { reportGenerated } = require('../utils/report-generated')
const { generateDomainFiles } = require('./generate-domain-files')

async function generateDomain(toolbox, moduleName, resourceName, options = {}) {
  const { format = 'text', dryRun = false, inMemory = true } = options

  const files = await generateDomainFiles(toolbox, moduleName, resourceName, {
    inMemory,
    dryRun,
  })

  reportGenerated(toolbox, files, { format, dryRun })

  if (options.format !== 'json' && !dryRun) {
    toolbox.print.success(`Domínio "${resourceName}" criado em ${moduleName}`)
  }

  return files
}

module.exports = generateDomain
