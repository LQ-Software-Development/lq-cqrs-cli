const fs = require('fs')
const path = require('path')

const EXCLUDED_DIRS = ['core']

function listModules(srcDir = './src') {
  if (!fs.existsSync(srcDir)) return []

  return fs
    .readdirSync(srcDir)
    .filter((file) => {
      const fullPath = path.join(srcDir, file)
      return fs.statSync(fullPath).isDirectory() && !EXCLUDED_DIRS.includes(file)
    })
}

async function resolveModule(toolbox, moduleFlag) {
  const { prompt, print } = toolbox

  if (moduleFlag) {
    const modules = listModules()
    if (modules.length && !modules.includes(moduleFlag)) {
      print.warning(
        `Módulo "${moduleFlag}" ainda não existe em src/. Será usado como destino do scaffold.`
      )
    }
    return moduleFlag
  }

  const modules = listModules()
  if (!modules.length) {
    print.warning('\nCrie um módulo antes de gerar um recurso!\n')
    print.info('Para criar um módulo, execute: nest g mo <nome_do_modulo>\n')
    return null
  }

  const { moduleName } = await prompt.ask({
    type: 'select',
    name: 'moduleName',
    message: 'Escolha o modulo',
    choices: modules,
  })

  return moduleName
}

module.exports = { listModules, resolveModule, EXCLUDED_DIRS }
