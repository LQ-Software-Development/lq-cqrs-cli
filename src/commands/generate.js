const command = {
  name: 'generate',
  alias: ['g'],
  description: 'Generate a new resource',
  run: async (toolbox) => {
    const { prompt } = toolbox

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

    switch (resourceType) {
      case 'resource':
        return require('../functions/generate-resource')(toolbox)
    }
  },
}

module.exports = command
