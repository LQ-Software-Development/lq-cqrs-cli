# LQ CLI (`@lq-software-development/cli`)

CLI para scaffold NestJS com padrões LQ (Result, DDD opt-in, CQRS opt-in). Pensada para uso humano e **agentes de IA** (modo `--no-interactive`).

## Instalação (npm)

```bash
npm install -g @lq-software-development/cli
```

Sem instalação global:

```bash
npx @lq-software-development/cli --help
```

Comandos disponíveis após instalar: **`lq`** e **`lq-install-skills`**.

### Desenvolvimento local (contribuidores)

```bash
git clone https://github.com/LQ-Software-Development/lq-cqrs-cli.git
cd lq-cqrs-cli
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

```bash
# No projeto Nest (raiz do app), com CLI instalada via npm:
lq-install-skills --all --project .
```

Ou a partir do clone do repositório:

```bash
./scripts/install-skills.sh --all --project .
```

| Harness | Guia |
|---------|------|
| **Cursor** | [docs/README.cursor.md](docs/README.cursor.md) |
| **OpenCode** | [.opencode/INSTALL.md](.opencode/INSTALL.md) |

Skills: `using-lq-cli`, `lq-nest-scaffold`. Snippet para `AGENTS.md`: [templates/AGENTS.md.snippet](templates/AGENTS.md.snippet).

## Publicar no npm (mantenedores)

Primeira vez publicando? Siga o guia passo a passo: **[docs/PUBLISHING-NPM.md](docs/PUBLISHING-NPM.md)**.

## Documentação

- [Referência de comandos](docs/commands.md)
- [Arquitetura do experimento](docs/architecture.md)
- [OpenCode (detalhes)](docs/README.opencode.md)

## Desenvolvimento

```bash
yarn test
yarn test:e2e
yarn validate:skills
```

## License

MIT — see LICENSE
