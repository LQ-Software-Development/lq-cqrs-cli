# LQ skills no OpenCode

Guia complementar a [.opencode/INSTALL.md](../.opencode/INSTALL.md).

## Por que skills + CLI?

| Camada | Função |
|--------|--------|
| **Skills** | Dizem ao agente *quando* e *como* usar a CLI |
| **LQ CLI** | Gera arquivos consistentes e validados (`tsc` no CI do CLI) |

Sem skills, o agente tende a criar controllers/services manualmente e divergir do padrão LQ.

## Skills incluídas

| Skill | Uso |
|-------|-----|
| `using-lq-cli` | Meta: detectar tarefas Nest/LQ e carregar o scaffold |
| `lq-nest-scaffold` | Comandos, flags, dry-run, registro no module |

## Fluxo recomendado no Agent

1. Carregar `lq-nest-scaffold`
2. `lq service <name> --module <m> --dry-run --format=json --no-interactive`
3. Executar sem `--dry-run`
4. Editar lógica de negócio e `*.module.ts`

## Instalação

Ver [.opencode/INSTALL.md](../.opencode/INSTALL.md).

```bash
./scripts/install-skills.sh --opencode --project .
```

## Descoberta de skills

OpenCode carrega skills ao subir e expõe nomes na tool `skill`. O frontmatter `description` ajuda o modelo a escolher a skill certa.

Requisitos do `name`:

- 1–64 caracteres, minúsculas, hífens simples
- Igual ao nome da pasta pai de `SKILL.md`

## Compatibilidade com outros harnesses

As mesmas pastas funcionam em:

- `.agents/skills/` (Cursor / agentes compatíveis)
- `.claude/skills/` (Claude Code compat)

O script `install-skills.sh --all` instala em Cursor e OpenCode de uma vez.

## Referência

- [commands.md](commands.md) — CLI completa
- [architecture.md](architecture.md) — pastas geradas
- [README.cursor.md](README.cursor.md) — instalação Cursor
