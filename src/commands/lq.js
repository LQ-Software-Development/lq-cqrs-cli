const command = {
  name: 'lq',
  run: async (toolbox) => {
    const { print } = toolbox

    print.warning('Bem vindo a CLI da Melhor "software house" do Brasil')
    print.error('Vulgo LQ')
    print.info('\nComandos disponiveis')
    print.success('init - Configura tsconfig, core DDD e dependências Nest')
    print.warning('service | s - Gera service + controller + DTOs (padrão IA)')
    print.warning('generate | g - Gera service, resource DDD ou domain')
    print.info('\nFlags úteis para agentes:')
    print.info('  --module, --no-interactive, --http, --cqrs, --domain, --repository')
    print.info('  --dry-run, --format=json')
  },
}

module.exports = command
