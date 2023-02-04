async function generateResource(toolbox) {
  const {
    print: { warning, success, error },
    template,
    prompt,
  } = toolbox

  const { resourceName } = await prompt.ask({
    type: 'input',
    name: 'resourceName',
    message: 'Nome do recurso: ',
  })

  const { useCaseType } = await prompt.ask({
    type: 'select',
    name: 'useCaseType',
    message: 'Tipo de useCase',
    choices: [
      {
        value: 'commands',
        message: 'Command - Utilizado para persistir dados',
      },
      {
        value: 'queries',
        message: 'Query`- Utilizado para buscar dados',
      },
    ],
  })

  const { createFlowTest } = await prompt.ask({
    type: 'select',
    name: 'createFlowTest',
    message: 'Criar teste de fluxo?',
    choices: [
      {
        value: true,
        message: 'Sim',
      },
      {
        value: false,
        message: 'Não',
      },
    ],
  })

  if (!resourceName)
    return Promise.all([
      error('Nome do recurso deve ser enviado'),
      warning('\nex.: pln generate:resource "nome_do_recurso"'),
    ])

  await template.generate({
    template: 'UseCaseInterface.ts.ejs',
    target: `./useCases/${useCaseType}/${resourceName}/I${resourceName}UseCase.ts`,
    props: {
      name: resourceName,
    },
  })

  await template.generate({
    template: 'Controller.ts.ejs',
    target: `./useCases/${useCaseType}/${resourceName}/${resourceName}Controller.ts`,
    props: {
      name: resourceName,
    },
  })

  await template.generate({
    template: 'UseCase.ts.ejs',
    target: `./useCases/${useCaseType}/${resourceName}/${resourceName}UseCase.ts`,
    props: {
      name: resourceName,
    },
  })

  await template.generate({
    template: 'DTO.ts.ejs',
    target: `./dtos/request/${resourceName}RequestDTO.ts`,
    props: {
      name: resourceName,
      type: 'Request',
    },
  })

  await template.generate({
    template: 'DTO.ts.ejs',
    target: `./dtos/response/${resourceName}ResponseDTO.ts`,
    props: {
      name: resourceName,
      type: 'Response',
    },
  })

  await template.generate({
    template: 'UnitTest.spec.ts.ejs',
    target: `./useCases/${useCaseType}/${resourceName}/${resourceName}UseCase.spec.ts`,
    props: {
      describe: 'Use case - ' + resourceName,
      sut: resourceName + 'UseCase',
    },
  })

  await template.generate({
    template: 'UnitTest.spec.ts.ejs',
    target: `./useCases/${useCaseType}/${resourceName}/${resourceName}Controller.spec.ts`,
    props: {
      describe: 'Controller - ' + resourceName,
      sut: resourceName + 'Controller',
    },
  })

  success(`Recurso "${resourceName}" criado com sucesso`)
}

module.exports = generateResource
