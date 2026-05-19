const { toKebabCase } = require('../utils/toKebabCase')
const { toUpperCamelCase } = require('../utils/toUpperCamelCase')
const { normalizeHttpMethod } = require('../utils/normalize-http')
const { normalizeCqrsFolder } = require('../utils/normalize-cqrs')
const { reportGenerated } = require('../utils/report-generated')

async function resolveUseCaseType(toolbox, options) {
  const cqrsFolder = normalizeCqrsFolder(options.cqrs)
  if (cqrsFolder) {
    return {
      useCaseType: cqrsFolder,
      restMethod: normalizeHttpMethod(options.http || 'Post'),
    }
  }

  if (options.noInteractive) {
    return { useCaseType: 'commands', restMethod: 'Post' }
  }

  return selectUseCaseType(toolbox, options.http)
}

async function selectUseCaseType(toolbox, httpFlag) {
  const { prompt } = toolbox

  const { useCaseType } = await prompt.ask({
    type: 'select',
    name: 'useCaseType',
    message: 'Tipo de useCase',
    choices: [
      { value: 'commands', message: 'Command - Utilizado para persistir dados' },
      { value: 'queries', message: 'Query - Utilizado para buscar dados' },
    ],
  })

  if (httpFlag) {
    return { useCaseType, restMethod: normalizeHttpMethod(httpFlag) }
  }

  const { restMethod } = await prompt.ask({
    type: 'select',
    name: 'restMethod',
    message: 'Qual o método HTTP?',
    choices: [
      { value: 'Post', message: 'POST - Criar informações' },
      { value: 'Put', message: 'PUT - Atualizar informações' },
      { value: 'Patch', message: 'PATCH - Atualizar parcialmente' },
      { value: 'Delete', message: 'DELETE - Deletar informações' },
      { value: 'Get', message: 'GET - Buscar informações' },
    ],
  })

  return { useCaseType, restMethod }
}

async function generateResource(toolbox, moduleName, resourceName, options = {}) {
  const { template, print } = toolbox
  const { format = 'text', dryRun = false } = options

  const resourceTitle = toUpperCamelCase(resourceName)
  const kebabedName = toKebabCase(resourceName)
  const { useCaseType, restMethod } = await resolveUseCaseType(toolbox, options)
  const base = `./src/${moduleName}/usecases/${useCaseType}/${resourceName}`
  const files = []

  const planned = [
    {
      template: 'UseCaseInterface.ts.ejs',
      target: `${base}/${resourceName}.usecase.interface.ts`,
      props: { name: resourceTitle, kebabedName },
    },
    {
      template: 'Controller.ts.ejs',
      target: `${base}/${resourceName}.controller.ts`,
      props: {
        name: resourceTitle,
        kebabedName,
        method: restMethod,
        moduleName,
      },
    },
    {
      template: 'UseCase.ts.ejs',
      target: `${base}/${resourceName}.usecase.ts`,
      props: { name: resourceTitle, kebabedName },
    },
    {
      template: 'DTO.ts.ejs',
      target: `${base}/dtos/${resourceName}.request.ts`,
      props: { name: resourceTitle, type: 'Request' },
    },
    {
      template: 'DTO.ts.ejs',
      target: `${base}/dtos/${resourceName}.response.ts`,
      props: { name: resourceTitle, type: 'Response' },
    },
  ]

  if (options.specs || !options.noInteractive) {
    planned.push(
      {
        template: 'UnitTest.spec.ts.ejs',
        target: `${base}/${resourceName}.usecase.spec.ts`,
        props: {
          describe: 'Use case - ' + resourceName,
          sut: resourceTitle + 'UseCase',
          kebabedName: kebabedName + '.usecase',
        },
      },
      {
        template: 'UnitTest.spec.ts.ejs',
        target: `${base}/${resourceName}.controller.spec.ts`,
        props: {
          describe: 'Controller - ' + resourceName,
          sut: resourceTitle + 'Controller',
          kebabedName: kebabedName + '.controller',
        },
      }
    )
  }

  for (const item of planned) {
    files.push(item.target)
    if (!dryRun) {
      await template.generate({
        template: item.template,
        target: item.target,
        props: item.props,
      })
    }
  }

  reportGenerated(toolbox, files, { format, dryRun })

  if (format !== 'json' && !dryRun) {
    print.success(`Recurso DDD "${resourceName}" criado em ${moduleName}`)
  }

  return files
}

module.exports = generateResource
