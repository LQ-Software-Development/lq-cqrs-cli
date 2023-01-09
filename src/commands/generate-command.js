const command = {
  name: 'generate:command',
  run: async (toolbox) => {
    const {
      print: { warning, success, error, info },
      parameters,
      template,
    } = toolbox

    if (!parameters.first)
      return Promise.all([
        error('Nome do recurso deve ser enviado'),
        warning('\nex.: pln generate:resource "nome_do_recurso"'),
      ])

    await template.generate({
      template: 'UseCaseInterface.ts.ejs',
      target: `./useCases/commands/${parameters.first}/I${parameters.first}UseCase.ts`,
      props: {
        name: parameters.first,
      },
    })

    await template.generate({
      template: 'Controller.ts.ejs',
      target: `./useCases/commands/${parameters.first}/${parameters.first}Controller.ts`,
      props: {
        name: parameters.first,
      },
    })

    await template.generate({
      template: 'UseCase.ts.ejs',
      target: `./useCases/commands/${parameters.first}/${parameters.first}UseCase.ts`,
      props: {
        name: parameters.first,
      },
    })

    await template.generate({
      template: 'DTO.ts.ejs',
      target: `./dtos/request/${parameters.first}RequestDTO.ts`,
      props: {
        name: parameters.first,
        type: 'Request',
      },
    })

    await template.generate({
      template: 'DTO.ts.ejs',
      target: `./dtos/response/${parameters.first}ResponseDTO.ts`,
      props: {
        name: parameters.first,
        type: 'Response',
      },
    })

    await template.generate({
      template: 'UnitTest.spec.ts.ejs',
      target: `./useCases/commands/${parameters.first}/${parameters.first}UseCase.spec.ts`,
      props: {
        describe: 'Use case - ' + parameters.first,
      },
    })

    await template.generate({
      template: 'UnitTest.spec.ts.ejs',
      target: `./useCases/commands/${parameters.first}/${parameters.first}Controller.spec.ts`,
      props: {
        describe: 'Controller - ' + parameters.first,
      },
    })

    success(`Recurso "${parameters.first}" criado com sucesso`)
  },
}

module.exports = command
