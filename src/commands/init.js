const { filesystem, print, system } = require('gluegun')

module.exports = {
  name: 'init',
  description: 'Configura o tsconfig.json para projetos Nest.js',
  run: async (toolbox) => {
    addConfigsTSConfig()
    addCoreDir(toolbox)
    await addRequiredLibs()
  },
}

function addCoreDir(toolbox) {
  try {
    // Define o caminho da pasta "core" no projeto Gluegun
    const coreDir = `${toolbox.runtime.defaultPlugin.directory}/shared/core`

    const srcCoreDir = `${process.cwd()}/src/core`

    // Verifica se a pasta "src/core" existe
    if (filesystem.exists(srcCoreDir)) {
      print.warning('A pasta "src/core" já existe no projeto.')
      return
    }

    // Verifica se a pasta "core" existe
    if (filesystem.exists(coreDir)) {
      // Define o caminho de destino no projeto Nest.js
      const destDir = `${process.cwd()}/src/core`

      // Copia a pasta "core" para o projeto em execução
      filesystem.copy(coreDir, destDir)

      print.success(
        'A pasta "core" foi copiada com sucesso para o projeto Nest.js.'
      )
    } else {
      print.error('A pasta "core" não foi encontrada no projeto Gluegun.')
    }
  } catch (error) {
    print.error(`Erro ao copiar a pasta "core": ${error}`)
  }
}

function addConfigsTSConfig() {
  try {
    // Verifica se o arquivo tsconfig.json existe
    if (filesystem.exists('tsconfig.json')) {
      // Lê o conteúdo do arquivo tsconfig.json
      const tsconfigContent = filesystem.read('tsconfig.json', 'json')

      // Verifica se o arquivo já possui a seção "compilerOptions"
      if (!tsconfigContent.compilerOptions) {
        tsconfigContent.compilerOptions = {}
      }

      // Verifica se já existe a seção "paths" dentro de "compilerOptions"
      if (!tsconfigContent.compilerOptions.paths) {
        tsconfigContent.compilerOptions.paths = {}
      }

      // Adiciona o caminho "@/*" para "src/*" dentro de "paths"
      tsconfigContent.compilerOptions.paths['@/*'] = ['src/*']

      // Salva as alterações de volta no arquivo tsconfig.json
      filesystem.write('tsconfig.json', tsconfigContent, { jsonIndent: 2 })

      print.success('O arquivo tsconfig.json foi configurado com sucesso!')
    } else {
      print.error(
        'O arquivo tsconfig.json não foi encontrado no diretório atual.'
      )
    }
  } catch (error) {
    print.error('Ocorreu um erro ao configurar o arquivo tsconfig.json:', error)
  }
}

async function addRequiredLibs() {
  try {
    // Define o gerenciador de pacotes (pode ser npm ou yarn)
    const packageManager = 'yarn' // ou 'yarn'

    print.info('Instalando bibliotecas necessárias...\n')
    // Comando para instalar o Nest typeorm
    const typeormInstallCommand = `${packageManager} add @nestjs/typeorm typeorm`
    await system.run(typeormInstallCommand)
    print.warning('- Typeorm instalado com sucesso.')

    // Comando para instalar @nestjs/swagger
    const swaggerInstallCommand = `${packageManager} add @nestjs/swagger`
    await system.run(swaggerInstallCommand)
    print.warning('- @nestjs/swagger instalado com sucesso.')

    // Comando para instalar o class-validator
    const classValidatorInstallCommand = `${packageManager} add class-validator`
    await system.run(classValidatorInstallCommand)
    print.warning('- class-validator instalado com sucesso.')

    print.success('Bibliotecas instaladas com sucesso.')
  } catch (error) {
    print.error(`Erro ao instalar bibliotecas: ${error}`)
  }
}
