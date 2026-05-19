# Publicar `@lq-software-development/cli` no npm

Guia para quem **nunca publicou** um pacote npm. Leia na ordem.

## O que você vai conseguir

Depois de publicado, qualquer pessoa (ou CI) pode instalar:

```bash
npm install -g @lq-software-development/cli
lq --version
```

Ou sem instalar globalmente:

```bash
npx @lq-software-development/cli service create-user --module users --http Post --no-interactive
```

O comando no terminal continua sendo **`lq`**, não o nome longo do pacote.

---

## Parte 1 — Conta e organização no npm (uma vez)

### 1. Criar conta

1. Acesse [https://www.npmjs.com/signup](https://www.npmjs.com/signup)
2. Confirme o e-mail
3. Ative **2FA para publicar** (obrigatório no npm hoje):
   - [npmjs.com](https://www.npmjs.com) → avatar → **Account** → **Security**
   - **Enable 2FA** (app autenticador, ex. Google Authenticator)
   - Escolha o modo **Authorization and publishing** (não só “login”)
   - Sem isso, `npm publish` retorna **403** pedindo 2FA

### 2. Criar a organização (scope)

O pacote se chama `@lq-software-development/cli`. O trecho `@lq-software-development` é a **organização** (scope).

1. Logado no npm, vá em [https://www.npmjs.com/org/create](https://www.npmjs.com/org/create)
2. Nome da organização: **`lq-software-development`** (minúsculas, com hífens)
3. Plano **Free** é suficiente para pacotes públicos
4. Convide outros devs da LQ como membros (Members), se quiser

Se o nome `lq-software-development` já estiver ocupado, escolha outro (ex. `lq-sd`) e altere o `name` no `package.json` antes de publicar.

### 3. Verificar se o nome do pacote está livre

No terminal:

```bash
npm view @lq-software-development/cli
```

Se retornar `404` ou `Not Found`, o nome está **livre** para vocês publicarem.

---

## Parte 2 — Primeira publicação (manual)

Faça a **primeira** publicação na sua máquina. Depois o GitHub Actions pode publicar versões novas.

### 1. Login no npm

```bash
npm login
```

- Username: seu usuário npm (não o nome da org)
- Password / OTP: conforme 2FA
- Email: o da conta

Confirme:

```bash
npm whoami
```

### 2. Clonar o repo e instalar dependências

```bash
git clone https://github.com/LQ-Software-Development/lq-cqrs-cli.git
cd lq-cqrs-cli
yarn install
```

### 3. Rodar testes (igual ao CI)

```bash
yarn validate:skills
yarn test
yarn test:e2e
```

### 4. Conferir o que será publicado

```bash
npm pack --dry-run
```

Deve listar `bin/`, `src/`, `skills/`, `scripts/`, etc. **Não** deve incluir `__tests__` ou `node_modules`.

### 5. Publicar

**Antes do publish**, faça login de novo (para gravar sessão com 2FA):

```bash
npm logout
npm login
```

No `npm login`, use senha + **código OTP** do autenticador.

Na raiz do projeto:

```bash
npm publish --access public
```

- O npm pode pedir o **OTP de novo** no terminal — isso é normal.
- `--access public` é obrigatório na **primeira** vez de um pacote `@org/...` (scoped).
- O `package.json` já tem `publishConfig.access: public` para as próximas versões.

Se der erro de permissão na **org**:

- Sua conta precisa ser **membro** da org `lq-software-development` com permissão de publish.
- Na org npm: **Members** → seu usuário → role **Developer** ou **Owner**.

### 6. Confirmar no site

Abra: [https://www.npmjs.com/package/@lq-software-development/cli](https://www.npmjs.com/package/@lq-software-development/cli)

Teste em outra pasta:

```bash
npm install -g @lq-software-development/cli
lq --help
```

---

## Parte 3 — Publicar versões novas (recomendado: GitHub)

### 1. Criar token npm para o CI

1. npm → Account → **Access Tokens** → **Generate New Token**
2. Tipo: **Granular Access Token** (recomendado) ou Classic **Automation**
3. Permissões: **Read and write** em pacotes da org `lq-software-development`
4. Copie o token (só aparece uma vez)

### 2. Secret no GitHub

No repositório `lq-cqrs-cli`:

1. **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret**
3. Nome: `NPM_TOKEN`
4. Valor: o token copiado

### 3. Criar um Release no GitHub

1. Atualize a versão em `package.json` (ex. `0.1.0` → `0.1.1`)
2. Commit e push
3. GitHub → **Releases** → **Draft a new release**
4. Tag: `v0.1.1` (com `v` na frente)
5. Title: `v0.1.1`
6. **Publish release**

O workflow [`.github/workflows/publish-npm.yml`](../.github/workflows/publish-npm.yml) vai:

- rodar testes
- alinhar a versão do `package.json` com a tag (`v0.1.1` → `0.1.1`)
- executar `npm publish`

Você pode acompanhar em **Actions** → **Publish npm**.

### Publicação manual de uma versão nova

```bash
# Atualize version no package.json
npm version patch   # ou minor / major
git push && git push --tags
npm publish --access public
```

---

## Parte 4 — O que o time usa no dia a dia

### Instalar a CLI

```bash
npm install -g @lq-software-development/cli
```

### Instalar skills no projeto Nest

```bash
lq-install-skills --all --project .
```

(vêm no mesmo pacote npm)

### Atualizar

```bash
npm update -g @lq-software-development/cli
```

---

## Erros comuns

### 403 — “Two-factor authentication … is required to publish”

**A organização provavelmente está ok.** Esse erro é da **conta npm**, não do nome `@lq-software-development`.

1. Ative 2FA: Account → Security → **Enable 2FA** → modo **Authorization and publishing**.
2. `npm logout` e `npm login` (com OTP).
3. Rode de novo: `npm publish --access public` (digite OTP se pedir).

**Alternativa (token):**

1. Account → **Access Tokens** → **Generate New Token** → **Granular Access Token**
2. Permissions: **Read and write** para pacotes da org `lq-software-development`
3. Marque **Bypass 2FA for automation** (se disponível no seu plano)
4. No terminal:

```bash
npm logout
npm login   # username + token como senha, ou:
# echo "//registry.npmjs.org/:_authToken=SEU_TOKEN" >> ~/.npmrc
npm publish --access public
```

### Outros erros

| Erro | O que fazer |
|------|-------------|
| `402 Payment Required` | Pacote scoped privado sem plano pago — use `--access public` |
| `403 Forbidden` (sem mencionar 2FA) | Usuário sem permissão na org — Members → Developer/Owner |
| `409 Conflict` | Versão já publicada — subir `version` no package.json |
| `ENEEDAUTH` | `npm logout` + `npm login` |
| `prepublishOnly` falhou | Corrigir testes localmente antes de publicar |

---

## Checklist rápido (primeira vez)

- [ ] Conta npm criada + 2FA
- [ ] Org `lq-software-development` criada
- [ ] Você é membro da org com permissão de publish
- [ ] `npm login` ok (`npm whoami`)
- [ ] `yarn test` e `yarn test:e2e` verdes
- [ ] `npm publish --access public` na raiz do repo
- [ ] Página do pacote abre no npmjs.com
- [ ] `npm install -g @lq-software-development/cli` funciona
- [ ] (Opcional) `NPM_TOKEN` no GitHub + release `v0.1.0` para CI

---

## Suporte

Problemas no pacote: [issues do repositório](https://github.com/LQ-Software-Development/lq-cqrs-cli/issues).

Documentação da CLI: [commands.md](commands.md).
