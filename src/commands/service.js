const fs = require('fs')
const { parseOptions } = require('../utils/parse-options')
const { resolveModule } = require('../utils/resolve-module')
const generateService = require('../functions/generate-service')

const command = {
  name: 'service',
  alias: ['s'],
  description:
    'Gera service + controller + DTOs (Nest-like). DDD/CQRS via flags.',
  run: async (toolbox) => {
    const {
      print: { error, warning },
      parameters,
    } = toolbox

    const options = parseOptions(toolbox)
    const resourceName = parameters.first

    if (!resourceName) {
      error('Nome do service é obrigatório')
      return warning(
        '\nEx.: lq service create-user --module users --http Post --no-interactive'
      )
    }

    if (!fs.existsSync('./src')) {
      error('Pasta src/ não encontrada. Execute na raiz do projeto Nest.')
      return
    }

    const moduleName = await resolveModule(toolbox, options.module)
    if (!moduleName) return

    if (!options.module && options.noInteractive) {
      error('Use --module <nome> com --no-interactive')
      return
    }

    await generateService(toolbox, moduleName, resourceName, options)
  },
}

module.exports = command
