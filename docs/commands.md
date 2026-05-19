# Referência de comandos — LQ CLI

## `lq init`

Configura o projeto Nest na pasta atual:

- Alias `@/*` → `src/*` no `tsconfig.json`
- Copia `src/core` (kernel DDD)
- Instala TypeORM, Swagger e class-validator via yarn

## `lq service <nome>` (recomendado / padrão IA)

Gera scaffold Nest-like com identidade LQ (`Result`, `ControllerBase`):

```bash
lq service create-user --module users --http Post --no-interactive
```

### Flags

| Flag | Descrição |
|------|-----------|
| `--module`, `-m` | Módulo destino em `src/<module>/` |
| `--http` | `Get`, `Post`, `Put`, `Patch`, `Delete` |
| `--cqrs` | `command` ou `query` → pasta `usecases/commands|queries/` |
| `--domain` | Gera entidade, mapper, repositórios |
| `--repository` | Igual `--domain` no experimento (gera stack de persistência) |
| `--in-memory` | Inclui repositório in-memory (com `--domain`) |
| `--no-interactive` | Sem prompts (obrigatório para agentes) |
| `--dry-run` | Lista arquivos sem escrever |
| `--format=json` | Saída JSON `{ dryRun, files }` |

## `lq generate <nome>` / `lq g`

Mesmo motor com `--type`:

```bash
lq g create-user --type service --module users --no-interactive --http Post
lq g create-order --type resource --module users --cqrs command --http Post --no-interactive
lq g user-profile --type domain --module users --no-interactive
lq g service create-user --module users --no-interactive
```

- `service` — padrão leve (2–4 arquivos)
- `resource` — DDD completo (use case + controller + DTOs + specs)
- `domain` — entidade + repositório + mapper (+ in-memory)

## Agentes (Cursor / Cloud)

Preferir:

```bash
lq service <kebab-name> --module <module> --http <Method> --no-interactive --format=json
```

Com DDD opt-in:

```bash
lq service <name> --module <m> --domain --in-memory --no-interactive
```
