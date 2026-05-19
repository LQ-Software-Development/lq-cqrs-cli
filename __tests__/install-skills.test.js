const { system, filesystem } = require('gluegun')
const fs = require('fs')
const os = require('os')
const path = require('path')

const repoRoot = filesystem.path(__dirname, '..')
const installScript = filesystem.path(repoRoot, 'scripts/install-skills.sh')

test('install-skills copies skills into project .cursor and .opencode', async () => {
  const tempDir = filesystem.path(
    os.tmpdir(),
    `lq-install-${Date.now()}-${Math.random().toString(16).slice(2)}`
  )

  filesystem.dir(tempDir)

  await system.run(
    `"${installScript}" --all --project "${tempDir}" --copy`,
    { cwd: repoRoot }
  )

  const cursorSkill = path.join(
    tempDir,
    '.cursor/skills/lq-nest-scaffold/SKILL.md'
  )
  const opencodeSkill = path.join(
    tempDir,
    '.opencode/skills/using-lq-cli/SKILL.md'
  )

  expect(fs.existsSync(cursorSkill)).toBe(true)
  expect(fs.existsSync(opencodeSkill)).toBe(true)

  filesystem.remove(tempDir)
})
