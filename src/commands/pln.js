const command = {
  name: 'pln',
  run: async (toolbox) => {
    const { print } = toolbox

    print.warning('Bem vindo a Plin CLI')
    print.info('\nComandos disponiveis')
    print.success(
      'generate:command - Cria uma estrutura de useCase do tipo command completa'
    )
    print.success(
      'generate:query - Cria uma estrutura de useCase do tipo query completa'
    )
  },
}

module.exports = command
