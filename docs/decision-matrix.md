# Matriz de decisão (experimento)

| Cenário | Status neste repo |
|---------|-------------------|
| **C. LQ slim (Nest-like)** | Implementado via `lq service` |
| **B. DDD completo consertado** | `lq g --type resource` + core/templates alinhados |
| **Validação CI** | `e2e-generate.test.js` + workflow GitHub Actions |
| **A. Só IA livre** | Ainda válido para protótipos; use `docs/architecture.md` como AGENTS.md no app |
| **D. Nest Schematics** | Não implementado; avaliar se CLI estabilizar |
| **E. MCP-only** | Futuro: expor mesmos geradores como tools |

## Recomendação operacional

1. Agentes: `lq service <nome> --module <m> --http <Method> --no-interactive`
2. Features com domínio rico: acrescentar `--domain --in-memory`
3. Legado CQRS: `--type resource --cqrs command|query`
