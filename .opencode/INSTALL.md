# Instalar skills LQ no OpenCode

## Pré-requisitos

- [OpenCode](https://opencode.ai) instalado
- CLI `lq`: `npm install -g @lq-software-development/cli`

## Instalação rápida (projeto Nest)

Na raiz do app Nest:

```bash
npm install -g @lq-software-development/cli
lq-install-skills --opencode --project .
```

Alternativa via clone:

```bash
git clone https://github.com/LQ-Software-Development/lq-cqrs-cli.git /tmp/lq-cqrs-cli
/tmp/lq-cqrs-cli/scripts/install-skills.sh --opencode --project .
```

Arquivos instalados em `.opencode/skills/`:

- `using-lq-cli/SKILL.md`
- `lq-nest-scaffold/SKILL.md` (+ `references/`)

Reinicie o OpenCode após instalar.

## Instalação global

```bash
./scripts/install-skills.sh --opencode --global
```

Destino: `~/.config/opencode/skills/`

## One-liner para o agente

Peça ao OpenCode:

```text
Siga as instruções em:
https://raw.githubusercontent.com/LQ-Software-Development/lq-cqrs-cli/refs/heads/master/.opencode/INSTALL.md
```

(Substitua `master` pelo branch/tag que você usa.)

## Verificar

Use a ferramenta nativa `skill` para listar skills. Deve aparecer:

- `using-lq-cli`
- `lq-nest-scaffold`

Carregue a skill principal:

```text
skill({ name: "lq-nest-scaffold" })
```

## Permissões (opcional)

Em `opencode.json`:

```json
{
  "permission": {
    "skill": {
      "*": "allow",
      "lq-nest-scaffold": "allow",
      "using-lq-cli": "allow"
    }
  }
}
```

## Paths suportados

| Escopo | Caminho |
|--------|---------|
| Projeto | `.opencode/skills/<name>/SKILL.md` |
| Global | `~/.config/opencode/skills/<name>/SKILL.md` |
| Compat | `.agents/skills/`, `.claude/skills/` |

Documentação: [OpenCode Skills](https://opencode.ai/docs/skills)

## CLI + skills

Skills não substituem a CLI. Fluxo típico:

```bash
lq init
nest g mo users
lq service create-user --module users --http Post --no-interactive
```

## Atualizar

```bash
./scripts/install-skills.sh --opencode --project . --copy
```

## Ajuda

- Comandos da CLI: [docs/commands.md](../docs/commands.md)
- OpenCode detalhado: [docs/README.opencode.md](../docs/README.opencode.md)
- Issues: repositório `lq-cqrs-cli` no GitHub
