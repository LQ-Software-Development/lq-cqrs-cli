const { toKebabCase } = require('../utils/toKebabCase')
const { toUpperCamelCase } = require('../utils/toUpperCamelCase')

async function generateResource(toolbox, moduleName, resourceName) {
  const {
    print: { success },
    template,
  } = toolbox

  const resourceTitle = toUpperCamelCase(resourceName)

  selectUseCaseType(toolbox).then(async ({ useCaseType, restMethod }) => {
    await template.generate({
      template: 'UseCaseInterface.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/${resourceName}.usecase.interface.ts`,
      props: {
        name: resourceTitle,
        kebabedName: toKebabCase(resourceName),
      },
    })

    await template.generate({
      template: 'Controller.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/${resourceName}.controller.ts`,
      props: {
        name: resourceTitle,
        kebabedName: toKebabCase(resourceName),
        method: restMethod,
        moduleName,
      },
    })

    await template.generate({
      template: 'UseCase.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/${resourceName}.usecase.ts`,
      props: {
        name: resourceTitle,
        kebabedName: toKebabCase(resourceName),
      },
    })

    await template.generate({
      template: 'DTO.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/dtos/${resourceName}.request.ts`,
      props: {
        name: resourceTitle,
        type: 'Request',
      },
    })

    await template.generate({
      template: 'DTO.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/dtos/${resourceName}.response.ts`,
      props: {
        name: resourceTitle,
        type: 'Response',
      },
    })

    await template.generate({
      template: 'UnitTest.spec.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/${resourceName}.usecase.spec.ts`,
      props: {
        describe: 'Use case - ' + resourceName,
        sut: resourceTitle + 'UseCase',
        kebabedName: toKebabCase(resourceName) + '.usecase',
      },
    })

    await template.generate({
      template: 'UnitTest.spec.ts.ejs',
      target: `./src/${moduleName}/usecases/${useCaseType}/${resourceName}/${resourceName}.controller.spec.ts`,
      props: {
        describe: 'Controller - ' + resourceName,
        sut: resourceTitle + 'Controller',
        kebabedName: toKebabCase(resourceName) + '.controller',
      },
    })

    success(`Recurso "${resourceName}" criado com sucesso`)
  })
}

async function selectUseCaseType(toolbox) {
  const { prompt } = toolbox
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

  const { restMethod } = await prompt.ask({
    type: 'select',
    name: 'restMethod',
    message: 'Qual o método HTTP?',
    choices: [
      {
        value: 'Post',
        message: 'POST - Criar informações',
      },
      {
        value: 'Put',
        message: 'PUT - Atualizar informações',
      },
      {
        value: 'Patch',
        message: 'PATCH - Atualizar informações parcialmente',
      },
      {
        value: 'Delete',
        message: 'DELETE - Deletar informações',
      },
      {
        value: 'Get',
        message: 'GET - Buscar informações',
      },
    ],
  })

  return { useCaseType, restMethod }
}

module.exports = generateResource
