// TODO: add CI integration
// TODO: add https://coveralls.io/ integration
// TODO: create a bootstrap node app based on this stack

const program = require('commander')
const integrator = require('./integrator')
const parser = require('./parser')

program
  .version('0.0.1')
  .option('-a, --api <path>', 'API definition file path')
  .option('-i, --integration <path>', 'API integration file path')
  .option('-o, --output <path>', 'Path to output extended API file')
  .option('-f, --format <format>', 'Output file format [yaml|yml|json], default \'yaml\'', /^(yaml|yml|json)$/i, 'YAML')
  .parse(process.argv)

switch (true) {
  case !program.api:
    console.error('no API file provided')
    process.exit(1)
    break
  case !program.integration:
    console.error('no API integration file provided')
    process.exit(1)
    break
  case !program.output:
    console.error('no path to output file provided')
    process.exit(1)
    break
  default: break
}

Promise.all([parser.parse(program.api), parser.parse(program.integration)])
  .then(([api, integration]) => integrator.extend(api, integration))
  .then(extendedApi => console.log(JSON.stringify(extendedApi, null, 2)))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
