const os = require('os')
const fs = require('fs')
const { system, filesystem } = require('gluegun')

const repoRoot = filesystem.path(__dirname, '..')
const cliBin = filesystem.path(repoRoot, 'bin', 'lq')
const fixtureRoot = filesystem.path(repoRoot, '__fixtures__/minimal-nest')
const coreSource = filesystem.path(repoRoot, 'src/shared/core')

const runCli = (args, cwd) =>
  system.run(`cd "${cwd}" && node "${cliBin}" ${args}`)

function createTempProject() {
  const tempDir = filesystem.path(
    os.tmpdir(),
    `lq-e2e-${Date.now()}-${Math.random().toString(16).slice(2)}`
  )

  filesystem.copy(fixtureRoot, tempDir)
  filesystem.copy(coreSource, filesystem.path(tempDir, 'src/core'))

  return tempDir
}

describe('e2e generate', () => {
  let tempDir

  beforeEach(() => {
    tempDir = createTempProject()
  })

  afterEach(() => {
    if (tempDir && filesystem.exists(tempDir)) {
      filesystem.remove(tempDir)
    }
  })

  test('service scaffold compila com tsc', async () => {
    const output = await runCli(
      'service create-user --module users --http Post --no-interactive',
      tempDir
    )

    expect(output).toContain('create-user')

    const serviceFile = filesystem.path(
      tempDir,
      'src/users/create-user/create-user.service.ts'
    )
    expect(fs.existsSync(serviceFile)).toBe(true)

    await system.run('npm install --silent', { cwd: tempDir })
    const tsc = await system.run('npm run typecheck --silent', { cwd: tempDir })

    expect(tsc).not.toMatch(/error TS/i)
  })

  test('resource DDD scaffold compila com tsc', async () => {
    await runCli(
      'generate create-order --type resource --module users --cqrs command --http Post --no-interactive',
      tempDir
    )

    const useCaseFile = filesystem.path(
      tempDir,
      'src/users/usecases/commands/create-order/create-order.usecase.ts'
    )
    expect(fs.existsSync(useCaseFile)).toBe(true)

    await system.run('npm install --silent', { cwd: tempDir })
    const tsc = await system.run('npm run typecheck --silent', { cwd: tempDir })

    expect(tsc).not.toMatch(/error TS/i)
  })

  test('dry-run retorna JSON sem criar arquivos', async () => {
    const output = await runCli(
      'service create-user --module users --http Post --no-interactive --dry-run --format=json',
      tempDir
    )

    const jsonStart = output.indexOf('{')
    expect(jsonStart).toBeGreaterThanOrEqual(0)
    const parsed = JSON.parse(output.slice(jsonStart))
    expect(parsed.dryRun).toBe(true)
    expect(parsed.files.length).toBeGreaterThan(0)

    const serviceFile = filesystem.path(
      tempDir,
      'src/users/create-user/create-user.service.ts'
    )
    expect(fs.existsSync(serviceFile)).toBe(false)
  })
})
