const command = {
  name: 'pln',
  run: async (toolbox) => {
    const { print } = toolbox

    print.warning('Bem vindo a Plin CLI')
    print.info('\nComandos disponiveis')
    print.info('pln generate | g - Gera um novo recurso')
  },
}

module.exports = command
