---
name: lq-nest-scaffold
description: Scaffold Nest endpoints with LQ CLI (service, DDD resource, domain) — always prefer lq over manual boilerplate in LQ projects
license: MIT
compatibility: cursor, opencode
metadata:
  audience: developers-and-agents
  cli-version: "0.0.1"
---

# LQ Nest Scaffold

## Prerequisites

1. Nest module folder exists: `nest g mo <module>` → `src/<module>/`
2. LQ core in the app: `lq init` (creates `src/core/` and `@/*` paths) if not present
3. CLI on PATH: `lq --version` (install via `yarn link` in the CLI repo)

## Agent workflow (mandatory)

1. **Plan paths** — dry-run with JSON (no files written):

   ```bash
   lq service <kebab-name> --module <module> --http <Method> --no-interactive --dry-run --format=json
   ```

2. **Generate** — same command without `--dry-run`

3. **Implement** — fill service/use-case body, DTO fields, domain rules only

4. **Wire Nest module** — add service/controller to `src/<module>/<module>.module.ts` `providers` / `controllers` (CLI does not auto-register yet)

5. **Verify** — `npx tsc --noEmit` or project test script

## Generator decision

See [references/decision-tree.md](references/decision-tree.md). Summary:

| Need | Command |
|------|---------|
| Default HTTP feature | `lq service <name> --module <m> --http Post --no-interactive` |
| CQRS folder layout | add `--cqrs command` or `--cqrs query` |
| Full DDD use case + specs (interactive) | `lq g <name> --type resource --module <m> --cqrs command --http Post` |
| DDD use case without specs (agent) | `lq g <name> --type resource ... --no-interactive` |
| Entity + repository stack | `lq service <name> --module <m> --domain --in-memory --no-interactive` |
| Domain only | `lq g <name> --type domain --module <m> --no-interactive` |

## Canonical commands

```bash
# Recommended default
lq service <kebab-name> --module <module> --http Post --no-interactive

# JSON output for agents
lq service <kebab-name> --module <module> --http Get --no-interactive --format=json

# CQRS paths: src/<module>/usecases/commands|queries/<kebab-name>/
lq service <kebab-name> --module <module> --cqrs command --http Post --no-interactive

# Legacy full DDD (8 files, no specs when --no-interactive)
lq g <kebab-name> --type resource --module <module> --cqrs command --http Post --no-interactive
```

Full flag list: [references/commands.md](references/commands.md)

## Output layout (service default)

```
src/<module>/<kebab-name>/
  <kebab-name>.service.ts
  <kebab-name>.controller.ts
  dto/<kebab-name>.request.dto.ts
  dto/<kebab-name>.response.dto.ts
```

Uses `@/core/application/result` and `ControllerBase`.

## Anti-patterns

- Do **not** create parallel folder structures when flags can express intent (`--cqrs`, `--domain`)
- Do **not** import `@/core/application/usecase.interface` paths unless `src/core` exists
- Do **not** skip `--no-interactive` in agent/CI sessions (prompts block headless runs)
- Do **not** regenerate with different kebab names for the same feature (creates duplicates)

## Module registration example

After `lq service create-user --module users --no-interactive`:

```typescript
// src/users/users.module.ts
import { CreateUserController } from './create-user/create-user.controller';
import { CreateUserService } from './create-user/create-user.service';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService],
})
export class UsersModule {}
```

Adjust class names to match generated files.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Nome do recurso deve ser enviado` | Pass resource name as first argument |
| `Use --module` with `--no-interactive` | Always pass `--module <name>` for agents |
| `tsc` errors on `handleErrorResponse` | Ensure `lq init` copied latest `src/core` |
| Gluegun ignores `--no-interactive` | Also works as `interactive: false` in parsed options |

## Installation (for humans)

Skills ship with this repo. From the CLI repository root:

```bash
./scripts/install-skills.sh --all --project /path/to/nest-app
```

Cursor: [docs/README.cursor.md](../../docs/README.cursor.md)  
OpenCode: [.opencode/INSTALL.md](../../.opencode/INSTALL.md)
