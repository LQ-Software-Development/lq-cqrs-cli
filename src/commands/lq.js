const command = {
  name: 'lq',
  run: async (toolbox) => {
    const { print } = toolbox

    print.warning('Bem vindo a CLI da Melhor "software house" do Brasil')
    print.error('Vulgo LQ')
    print.info('\nComandos disponiveis')
    print.success('init - Configura o tsconfig.json para projetos Nest.js')
    print.warning('generate | g - Gera um novo recurso')
  },
}

module.exports = command
