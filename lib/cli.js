const program = require('commander')
const encoder = require('./encoder')
const integrator = require('./integrator')
const parser = require('./parser')
require('pkginfo')(module, 'version')

exports.run = () => {
  program
    .version(module.exports.version)
    .option('-a, --api <path>', 'API definition file path')
    .option('-i, --integration <path>', 'API integration file path')
    .option('-o, --output <path>', 'path to output extended API file')
    // .option('-c, --cloud [cloud]', 'cloud provider [AWS], default \'AWS\'', /^(aws)$/i, 'AWS')
    .option(
      '-f, --format [format]',
      'output file format [yaml|yml|json], default \'yaml\'',
      /^(yaml|yml|json)$/i,
      'YAML' // eslint-disable-line comma-dangle
    )
    .parse(process.argv)

  exports.validate(program)
    .then(() => exports.runWorkflow(program))
    .catch((err) => {
      console.error(err.message) // eslint-disable-line no-console
      process.exit(1)
    })
}

exports.validate = (prg) => {
  switch (true) {
    case !prg.api: return Promise.reject(new Error('no API file provided'))
    case !prg.integration: return Promise.reject(new Error('no API integration file provided'))
    case !prg.output: return Promise.reject(new Error('no path to output file provided'))
    default: return Promise.resolve()
  }
}

exports.runWorkflow = prg =>
  Promise.all([parser.parse(prg.api), parser.parse(prg.integration)])
    .then(([api, integration]) => integrator.extend(api, integration))
    .then(extendedApi => encoder.save(extendedApi, prg.output, prg.format))
