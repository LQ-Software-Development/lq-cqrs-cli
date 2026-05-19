const fs = require('fs')
const { parseOptions } = require('../utils/parse-options')
const { resolveModule } = require('../utils/resolve-module')
const { resolveResourceName } = require('../utils/resolve-resource-name')

const command = {
  name: 'generate',
  alias: ['g'],
  description:
    'Gera recursos (service, resource DDD, domain). Use flags para modo agente.',
  run: async (toolbox) => {
    const {
      prompt,
      print: { warning, error, info, colors },
    } = toolbox

    const options = parseOptions(toolbox)
    const { name: resourceName, type: forcedType } = resolveResourceName(
      toolbox.parameters
    )

    if (!resourceName) {
      error('Nome do recurso deve ser enviado')
      return warning(
        '\nExemplos:\n' +
          '  lq g create-user --type service --module users --no-interactive\n' +
          '  lq g service create-user --module users --http Post --no-interactive\n' +
          '  lq g create-order --type resource --module orders --cqrs command --http Post --no-interactive\n' +
          '  lq service create-user --module users --no-interactive\n'
      )
    }

    if (!fs.existsSync('./src')) {
      error('\n ==== ERRO AO GERAR RECURSO ====')
      return warning(
        '\nNão existe uma pasta "src" ou você não está na raiz do projeto!\n'
      )
    }

    const moduleName = await resolveModule(toolbox, options.module)
    if (!moduleName) return

    if (!options.module && options.noInteractive) {
      error('Use --module <nome> com --no-interactive')
      return
    }

    let resourceType = forcedType

    if (!resourceType && options.noInteractive) {
      resourceType = 'service'
    }

    if (!resourceType) {
      const answer = await prompt.ask({
        type: 'select',
        name: 'resourceType',
        message: 'Tipo de recurso',
        choices: [
          {
            value: 'service',
            message: 'Service (padrão) - service, controller, DTOs',
          },
          {
            value: 'resource',
            message: 'Recurso DDD completo - use case, controller, DTOs',
          },
          {
            value: 'domain',
            message: 'Domínio - entidade, repositório, mapper',
          },
        ],
      })
      resourceType = answer.resourceType
    }

    switch (resourceType) {
      case 'service':
        return require('../functions/generate-service')(
          toolbox,
          moduleName,
          resourceName,
          options
        )
      case 'resource':
        return require('../functions/generate-resource')(
          toolbox,
          moduleName,
          resourceName,
          options
        )
      case 'domain':
        return require('../functions/generate-domain')(
          toolbox,
          moduleName,
          resourceName,
          options
        )
      default:
        error(`Tipo inválido: ${resourceType}`)
        return info(
          'Tipos válidos: service, resource, domain (ou use: lq service <nome>)'
        )
    }
  },
}

module.exports = command
