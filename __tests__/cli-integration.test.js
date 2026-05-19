const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')
const cli = async (cmd, cwd) =>
  system.run(`node ${filesystem.path(src, 'bin', 'lq')} ${cmd}`, { cwd })

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('init')
  expect(output).toContain('service')
  expect(output).toContain('generate')
})
