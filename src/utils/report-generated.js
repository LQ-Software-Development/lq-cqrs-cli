function reportGenerated(toolbox, files, { format, dryRun }) {
  const { print } = toolbox

  if (format === 'json') {
    console.log(JSON.stringify({ dryRun, files }, null, 2))
    return
  }

  if (dryRun) {
    print.info('Dry-run — arquivos que seriam gerados:')
    files.forEach((file) => print.info(`  ${file}`))
    return
  }

  files.forEach((file) => print.success(`  ${file}`))
}

module.exports = { reportGenerated }
