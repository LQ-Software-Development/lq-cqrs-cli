# LQ CLI — command reference (agent cheatsheet)

Source of truth: `docs/commands.md` in the CLI repository.

## init

```bash
lq init
```

- Sets `tsconfig` path `@/*` → `src/*`
- Copies `src/core`
- Installs TypeORM, Swagger, class-validator (yarn)

## service (default for agents)

```bash
lq service <kebab-name> --module <module> --http <Get|Post|Put|Patch|Delete> --no-interactive
```

| Flag | Purpose |
|------|---------|
| `--module`, `-m` | Target module under `src/` |
| `--http` | HTTP decorator method |
| `--cqrs` | `command` \| `query` → `usecases/commands\|queries/` |
| `--domain` | Entity, mapper, repositories, model |
| `--repository` | Same as `--domain` in current CLI |
| `--in-memory` | In-memory repository (with domain) |
| `--no-interactive` | Required for agents |
| `--dry-run` | List paths only |
| `--format=json` | `{ "dryRun": bool, "files": string[] }` |

## generate / g

```bash
lq g <name> --type service|resource|domain --module <m> --no-interactive [flags]
lq g service <name> --module <m> --no-interactive
```

### resource (full DDD)

```bash
lq g <name> --type resource --module <m> --cqrs command --http Post --no-interactive
```

Adds specs only in interactive mode, or with `--specs`.

### domain only

```bash
lq g <name> --type domain --module <m> --no-interactive
```

## Agent one-liners

```bash
# Plan
lq service foo --module bar --http Post --no-interactive --dry-run --format=json

# Execute
lq service foo --module bar --http Post --no-interactive

# DDD persistence stack
lq service foo --module bar --domain --in-memory --no-interactive
```
