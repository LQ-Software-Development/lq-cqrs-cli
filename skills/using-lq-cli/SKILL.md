---
name: using-lq-cli
description: Use ao criar endpoints, services, controllers ou DTOs Nest no padrão LQ — verifique a LQ CLI antes de escrever boilerplate manualmente
license: MIT
compatibility: cursor, opencode
metadata:
  audience: developers-and-agents
  cli-version: "0.0.1"
---

# Using LQ CLI

If you were dispatched only to run a single shell command, skip to `lq-nest-scaffold`.

## Instruction priority

1. **User explicit instructions** (AGENTS.md, direct request) — highest
2. **LQ skills** (`lq-nest-scaffold`, this skill)
3. Default system behavior — lowest

## When to invoke

Invoke **`lq-nest-scaffold`** (load it fully) when ANY of these apply:

- Creating or extending a NestJS HTTP endpoint (controller, service, DTO)
- Scaffolding CRUD or command/query handlers in an LQ-style project
- The repo has `src/core/` (after `lq init`) or the user mentions LQ, Result, CQRS
- You are about to create files matching `*.service.ts`, `*.controller.ts`, `usecases/`, `domain/`

If there is even a small chance the LQ CLI applies, **load `lq-nest-scaffold` before writing files**.

## Mandatory rule

**Do not hand-write LQ boilerplate** (service + controller + DTOs, or full use-case folders) when:

- The `lq` command is available in the shell, AND
- The target Nest module folder exists under `src/<module>/`

Use the CLI first, then edit only business logic and module registration.

## How to load skills

| Harness | Action |
|---------|--------|
| **Cursor** | Skill tool, or `@lq-nest-scaffold`, or `/lq-nest-scaffold` in Agent chat |
| **OpenCode** | `skill({ name: "lq-nest-scaffold" })` via the native skill tool |

Never read skill files with generic file tools if your platform provides a dedicated Skill/skill loader.

## Quick check before coding

```bash
command -v lq && test -d src/core && ls src/
```

If `lq` is missing: ask the user to run `yarn link` in the CLI repo or install globally.

If `src/core` is missing: run `lq init` once at the Nest project root (after `nest g mo <module>`).

## Red flags (stop and use the CLI)

| Thought | Reality |
|---------|---------|
| "I'll just add a quick controller" | That is exactly what `lq service` is for |
| "Faster to copy-paste" | Drift breaks imports and folder layout; CLI is validated in CI |
| "I'll match the existing pattern by hand" | Run `--dry-run --format=json` and match the CLI output |
