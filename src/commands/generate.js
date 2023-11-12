const fs = require('fs')
const path = require('path')

const command = {
  name: 'generate',
  alias: ['g'],
  description: 'Generate a new resource',
  run: async (toolbox) => {
    const {
      prompt,
      print: { warning, error, info, colors },
      parameters,
    } = toolbox

    const { resourceType } = await prompt.ask({
      type: 'select',
      name: 'resourceType',
      message: 'Tipo de recurso',
      choices: [
        {
          value: 'resource',
          message: 'Recurso completo - UseCase, controller, dtos etc.',
        },
      ],
    })

    const hasSrc = fs.existsSync('./src')
    if (!hasSrc) {
      error('\n ==== ERRO AO GERAR RECURSO ====')
      return warning(
        '\nNão existe uma pasta "src" ou você não está na raiz do projeto!\n'
      )
    }
    const files = fs.readdirSync('./src')

    const directories = files.filter((file) => {
      return fs.statSync(path.join('./src', file)).isDirectory()
    })

    if (!directories.length) {
      warning('\nCrie um módulo antes de gerar um recurso!\n')
      info('Para criar um módulo, execute o comando:')
      return console.log(
        colors.green('\nnest') +
          colors.magenta(' g mo ') +
          colors.yellow('<nome_do_modulo>') +
          '\n'
      )
    }

    const { moduleName } = await prompt.ask({
      type: 'select',
      name: 'moduleName',
      message: 'Escolha o modulo',
      choices: directories,
    })

    let { first: resourceName } = parameters

    if (!resourceName) {
      if (!resourceName) {
        error('Nome do recurso deve ser enviado')
        return warning('\nex.: lq generate "nome_do_recurso"')
      }
    }

    switch (resourceType) {
      case 'resource':
        return require('../functions/generate-resource')(
          toolbox,
          moduleName,
          resourceName
        )
    }
  },
}

module.exports = command
