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

## Agent Skills (Cursor / OpenCode)

Skills ensinam agentes a usar a CLI em vez de escrever boilerplate manualmente.

```bash
# No projeto Nest (raiz do app)
/path/to/lq-cqrs-cli/scripts/install-skills.sh --all --project .
```

| Harness | Guia |
|---------|------|
| **Cursor** | [docs/README.cursor.md](docs/README.cursor.md) |
| **OpenCode** | [.opencode/INSTALL.md](.opencode/INSTALL.md) |

Skills incluídas: `using-lq-cli`, `lq-nest-scaffold`.

Cole também [`templates/AGENTS.md.snippet`](templates/AGENTS.md.snippet) no `AGENTS.md` do seu app Nest.

## Documentação

- [Referência de comandos](docs/commands.md)
- [Arquitetura do experimento](docs/architecture.md)
- [OpenCode (detalhes)](docs/README.opencode.md)

## Desenvolvimento

```bash
yarn test              # testes unitários
yarn test:e2e          # gera em fixture + tsc
yarn validate:skills   # valida SKILL.md
```

## License

MIT — see LICENSE
