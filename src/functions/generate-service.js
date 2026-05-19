const { toKebabCase } = require('../utils/toKebabCase')
const { toUpperCamelCase } = require('../utils/toUpperCamelCase')
const { toCamelCase } = require('../utils/toCamelCase')
const { normalizeHttpMethod } = require('../utils/normalize-http')
const { normalizeCqrsFolder } = require('../utils/normalize-cqrs')
const { reportGenerated } = require('../utils/report-generated')
const { generateDomainFiles } = require('./generate-domain-files')

function getServiceBasePath(moduleName, kebabedName, cqrsFolder) {
  if (!cqrsFolder) {
    return `./src/${moduleName}/${kebabedName}`
  }

  return `./src/${moduleName}/usecases/${cqrsFolder}/${kebabedName}`
}

async function resolveHttpMethod(toolbox, httpFlag, noInteractive) {
  if (httpFlag) return normalizeHttpMethod(httpFlag)

  if (noInteractive) return 'Post'

  const { prompt } = toolbox
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

  return restMethod
}

async function generateService(toolbox, moduleName, resourceName, options = {}) {
  const { template, print } = toolbox
  const {
    cqrs,
    http,
    domain = false,
    repository = false,
    inMemory = false,
    format = 'text',
    dryRun = false,
    noInteractive = false,
  } = options

  const name = toUpperCamelCase(resourceName)
  const kebabedName = toKebabCase(resourceName)
  const camelName = toCamelCase(resourceName)
  const cqrsFolder = normalizeCqrsFolder(cqrs)
  const method = await resolveHttpMethod(toolbox, http, noInteractive)
  const basePath = getServiceBasePath(moduleName, kebabedName, cqrsFolder)
  const route = kebabedName
  const files = []

  const serviceProps = {
    name,
    kebabedName,
    camelName,
    moduleName,
    method,
    route,
    repository: domain || repository,
  }

  const targets = [
    {
      template: 'Service.ts.ejs',
      target: `${basePath}/${kebabedName}.service.ts`,
    },
    {
      template: 'ServiceController.ts.ejs',
      target: `${basePath}/${kebabedName}.controller.ts`,
    },
    {
      template: 'ServiceDto.ts.ejs',
      target: `${basePath}/dto/${kebabedName}.request.dto.ts`,
      props: { name, type: 'Request' },
    },
    {
      template: 'ServiceDto.ts.ejs',
      target: `${basePath}/dto/${kebabedName}.response.dto.ts`,
      props: { name, type: 'Response' },
    },
  ]

  for (const item of targets) {
    files.push(item.target)
    if (!dryRun) {
      await template.generate({
        template: item.template,
        target: item.target,
        props: { ...serviceProps, ...(item.props || {}) },
      })
    }
  }

  if (domain || repository) {
    const domainFiles = await generateDomainFiles(
      toolbox,
      moduleName,
      resourceName,
      {
        inMemory: inMemory || domain,
        dryRun,
      }
    )
    files.push(...domainFiles)
  }

  reportGenerated(toolbox, files, { format, dryRun })

  if (format !== 'json' && !dryRun) {
    print.success(`Service "${kebabedName}" criado em ${moduleName}`)
  }

  return files
}

module.exports = generateService
