const test = require('ava')
const CliTest = require('command-line-test')
const td = require('testdouble')

const encoder = td.replace('../lib/encoder')
const integrator = td.replace('../lib/integrator')
const parser = td.replace('../lib/parser')
const cli = require('../lib/cli')

test.after.always(t => td.reset()) // eslint-disable-line no-unused-vars

test('CLI should require mandatory parameters', async t => {
  const testCases = [
    {options: {}, expected: /no API file provided/},
    {options: {api: 'api.yaml'}, expected: /no API integration file provided/},
    {options: {api: 'api.yaml', integration: 'integration.yaml'}, expected: /no path to output file provided/},
  ]

  const wrapReject = (options) =>
    new Promise((resolve, reject) => cli.validate(options).then(reject, resolve))

  const validator = (actual, idx) => t.regex(actual.message, testCases[idx].expected)

  await Promise.all(testCases.map(testCase => wrapReject(testCase.options)))
    .then(results => results.forEach(validator))
    .catch(t)
})

test('CLI should successfully accept all mandatory parameters', async t => {
  const options = {api: 'api.yaml', integration: 'integration.yaml', output: 'aws.yaml'}
  await t.notThrows(() => { cli.validate(options) })
})

test('CLI should run workflow', async t => {
  const options = {
    api: 'api.yaml',
    integration: 'integration.yaml',
    output: 'aws.yaml',
    format: 'yaml',
  }
  td.when(parser.parse('api.yaml')).thenReturn(Promise.resolve({api: {}}))
  td.when(parser.parse('integration.yaml')).thenReturn(Promise.resolve({integration: {}}))
  td.when(integrator.extend({api: {}}, {integration: {}})).thenReturn({api: {integration: {}}})
  td.when(encoder.save({api: {integration: {}}}, 'aws.yaml', 'yaml')).thenReturn(Promise.resolve())

  await t.notThrows(() => { cli.runWorkflow(options) })
})

test('CLI run should stop on error', async t => {
  const cmd = './cli.js --api 1.yaml --integration 2.yaml --output 3.yaml'
  const cliTest = new CliTest()
  const output = await cliTest.exec(cmd)
  t.regex(output.error.message, /Command failed/)
  t.is(output.error.cmd, './cli.js --api 1.yaml --integration 2.yaml --output 3.yaml')
})
