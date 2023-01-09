const command = {
  name: 'pln',
  run: async (toolbox) => {
    const { print } = toolbox

    print.warning('Bem vindo a Plin CLI')
    print.info('\nComandos disponiveis')
    print.success(
      'generate:resource - Cria uma estrutura de recurso completa'
    )
  },
}

module.exports = command
