# LQ CLI

CLI para scaffold NestJS com padrões LQ (Result, DDD opt-in, CQRS opt-in). Pensada para uso humano e **agentes de IA** (modo `--no-interactive`).

## Instalação

```bash
yarn install
yarn link
```

## Uso rápido

```bash
# No projeto Nest (após nest g mo users)
lq init

# Padrão recomendado (Nest-like)
lq service create-user --module users --http Post --no-interactive

# DDD completo (legado)
lq g create-order --type resource --module users --cqrs command --http Post --no-interactive

# Dry-run + JSON para agentes
lq service create-user --module users --no-interactive --dry-run --format=json
```

## Documentação

- [Referência de comandos](docs/commands.md)
- [Arquitetura do experimento](docs/architecture.md)

## Desenvolvimento

```bash
yarn test              # testes unitários
yarn test:e2e          # gera em fixture + tsc
```

## License

MIT — see LICENSE
