# Instalar skills LQ no Cursor

As skills ensinam o agente a usar a **LQ CLI** em projetos Nest em vez de escrever boilerplate manualmente.

## Pré-requisitos

- [Cursor](https://cursor.com) com Agent / Skills habilitados
- CLI `lq` no PATH: `npm install -g @lq-software-development/cli`

## Opção 1 — Projeto Nest (recomendado)

Na raiz do **app Nest**:

```bash
npm install -g @lq-software-development/cli
lq-install-skills --cursor --project .
```

Alternativa via clone do repositório:

```bash
git clone https://github.com/LQ-Software-Development/lq-cqrs-cli.git /tmp/lq-cqrs-cli
/tmp/lq-cqrs-cli/scripts/install-skills.sh --cursor --project .
```

Isso instala em `.cursor/skills/`:

- `using-lq-cli`
- `lq-nest-scaffold`

Reabra o Agent chat ou reinicie o Cursor se as skills não aparecerem.

## Opção 2 — Global (todos os projetos)

```bash
./scripts/install-skills.sh --cursor --global
```

Destino: `~/.cursor/skills/`

## Opção 3 — Plugin local

Para desenvolvedores da LQ que editam o próprio CLI:

```bash
# Na raiz do lq-cqrs-cli
mkdir -p ~/.cursor/plugins/local
ln -sf "$(pwd)" ~/.cursor/plugins/local/lq-cli
```

O plugin usa [`.cursor-plugin/plugin.json`](../.cursor-plugin/plugin.json) e descobre `skills/*/SKILL.md`.

Alternativa: copiar só o manifest + skills:

```bash
cp -r .cursor-plugin ~/.cursor/plugins/local/lq-cli-plugin
cp -r skills ~/.cursor/plugins/local/lq-cli-plugin/
cp -r rules ~/.cursor/plugins/local/lq-cli-plugin/
```

## Usar no Agent

1. Digite `/` e busque `lq-nest-scaffold` ou `using-lq-cli`
2. Ou mencione `@lq-nest-scaffold` no chat
3. O agente deve rodar `lq service ... --no-interactive` antes de criar arquivos

## AGENTS.md no projeto Nest

Cole o conteúdo de [`templates/AGENTS.md.snippet`](../templates/AGENTS.md.snippet) no `AGENTS.md` do seu app, ou rode no futuro `lq init --with-agent-skill`.

## Paths reconhecidos pelo Cursor

| Escopo | Caminho |
|--------|---------|
| Projeto | `.cursor/skills/<skill>/SKILL.md` |
| Global | `~/.cursor/skills/<skill>/SKILL.md` |
| Compat | `.agents/skills/<skill>/SKILL.md` |

Documentação: [Cursor Skills](https://cursor.com/docs/skills)

## Atualizar skills

Reexecute o instalador com `--copy` se preferir arquivos estáticos:

```bash
./scripts/install-skills.sh --cursor --project . --copy
```

## Problemas comuns

| Sintoma | Solução |
|---------|---------|
| Skill não aparece no `/` | Confirme pasta `SKILL.md` em maiúsculas; reinicie Cursor |
| Agente ignora a CLI | Adicione `AGENTS.md.snippet`; use rule `nest-lq-scaffold` |
| `lq: command not found` | `npm install -g @lq-software-development/cli` |
