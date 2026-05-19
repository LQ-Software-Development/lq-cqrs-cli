# Generator decision tree

```mermaid
flowchart TD
  start[New Nest feature in LQ project] --> hasCore{src/core exists?}
  hasCore -->|no| init[lq init]
  hasCore -->|yes| hasMod{src/module exists?}
  init --> hasMod
  hasMod -->|no| nestMo["nest g mo module"]
  hasMod --> kind{What are you building?}

  kind -->|HTTP endpoint default| svc["lq service name --module m --http Method --no-interactive"]
  kind -->|CQRS command/query folders| svcCqrs["lq service name --module m --cqrs command|query --no-interactive"]
  kind -->|Rich domain + repos| svcDom["lq service name --module m --domain --in-memory --no-interactive"]
  kind -->|Full use case + interface + specs| res["lq g name --type resource --cqrs ... --no-interactive"]
  kind -->|Entity/repo only| dom["lq g name --type domain --no-interactive"]

  svc --> wire[Register in module.ts]
  svcCqrs --> wire
  svcDom --> wire
  res --> wire
  dom --> wire
```

## Choose by file count

| Approach | Files (typical) | When |
|----------|-----------------|------|
| `lq service` | 4 | CRUD/handlers, agents, fast iteration |
| `lq service --cqrs` | 4 under `usecases/` | Team uses command/query folders |
| `lq service --domain` | 4 + domain stack | Persistence + domain entity |
| `lq g --type resource` | 5–7 | Strict use-case interface + DDD layout |
| `lq g --type domain` | 5–6 | No HTTP layer yet |

## Default for AI agents

**Always start with** `lq service` unless the user explicitly asks for full DDD resource layout or domain-only scaffold.
