// TODO: add https://coveralls.io/ integration
// TODO: add https://www.codacy.com integration
// TODO: wrap it in npm package
// TODO: make better README with examples

const program = require('commander')
const encoder = require('./encoder')
const integrator = require('./integrator')
const parser = require('./parser')

program
  .version('0.0.1')
  .option('-a, --api <path>', 'API definition file path')
  .option('-i, --integration <path>', 'API integration file path')
  .option('-o, --output <path>', 'Path to output extended API file')
  .option('-c, --cloud <cloud>', 'Cloud provider [AWS], default \'AWS\'', /^(aws)$/i, 'AWS')
  .option('-f, --format <format>', 'Output file format [yaml|yml|json], default \'yaml\'', /^(yaml|yml|json)$/i, 'YAML')
  .parse(process.argv)

/* eslint-disable no-console */
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
  .then(extendedApi => encoder.save(extendedApi, program.output, program.format))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
/* eslint-enable no-console */
