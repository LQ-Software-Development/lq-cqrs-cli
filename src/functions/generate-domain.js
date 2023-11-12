const { prompt } = require('gluegun')
const { toKebabCase } = require('../utils/toKebabCase')
const { toUpperCamelCase } = require('../utils/toUpperCamelCase')

async function generateDomain(toolbox, moduleName, resourceName) {
  const { template } = toolbox

  const entityName = toUpperCamelCase(resourceName)
  const kebabedName = toKebabCase(resourceName)

  const domainType = await prompt.ask({
    type: 'select',
    name: 'Tipo de Domínio',
    message: 'Escolha o tipo de domínio',
    choices: [
      { name: 'Entity', message: 'Entidade', value: 'entity' },
      // { name: 'Aggregate', message: 'Aggregado', value: 'aggregate' },
    ],
  })

  await template.generate({
    template: 'Entity.ts.ejs',
    target: `./src/${moduleName}/domain/${kebabedName}.domain.ts`,
    props: {
      entityName,
      kebabedName,
    },
  })

  await template.generate({
    template: 'IRepository.ts.ejs',
    target: `./src/${moduleName}/repositories/${kebabedName}.repository.interface.ts`,
    props: {
      entityName,
      kebabedName,
    },
  })

  await template.generate({
    template: 'Repository.ts.ejs',
    target: `./src/${moduleName}/repositories/implements/${kebabedName}.repository.ts`,
    props: {
      entityName,
      kebabedName,
    },
  })

  await template.generate({
    template: 'RepositoryInMemory.ts.ejs',
    target: `./src/${moduleName}/repositories/in-memory/${kebabedName}.repository.ts`,
    props: {
      entityName,
      kebabedName,
    },
  })

  await template.generate({
    template: 'Mapper.ts.ejs',
    target: `./src/${moduleName}/mappers/${kebabedName}.mapper.ts`,
    props: {
      entityName,
      kebabedName,
    },
  })
}

module.exports = generateDomain
