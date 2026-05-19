const { toKebabCase } = require('../utils/toKebabCase')
const { toUpperCamelCase } = require('../utils/toUpperCamelCase')

async function generateDomainFiles(
  toolbox,
  moduleName,
  resourceName,
  { inMemory = true, dryRun = false } = {}
) {
  const { template } = toolbox
  const entityName = toUpperCamelCase(resourceName)
  const kebabedName = toKebabCase(resourceName)
  const props = { entityName, kebabedName }
  const files = []

  const planned = [
    {
      template: 'Entity.ts.ejs',
      target: `./src/${moduleName}/domain/${kebabedName}.domain.ts`,
    },
    {
      template: 'IRepository.ts.ejs',
      target: `./src/${moduleName}/repositories/${kebabedName}.repository.interface.ts`,
    },
    {
      template: 'EntityModel.ts.ejs',
      target: `./src/${moduleName}/models/${kebabedName}.model.ts`,
    },
    {
      template: 'Repository.ts.ejs',
      target: `./src/${moduleName}/repositories/implements/${kebabedName}.repository.ts`,
    },
    {
      template: 'Mapper.ts.ejs',
      target: `./src/${moduleName}/mappers/${kebabedName}.mapper.ts`,
    },
  ]

  if (inMemory) {
    planned.push({
      template: 'RepositoryInMemory.ts.ejs',
      target: `./src/${moduleName}/repositories/in-memory/${kebabedName}.repository.ts`,
    })
  }

  for (const item of planned) {
    files.push(item.target)
    if (!dryRun) {
      await template.generate({
        template: item.template,
        target: item.target,
        props,
      })
    }
  }

  return files
}

module.exports = { generateDomainFiles }
