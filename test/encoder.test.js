const fs = require('fs')
const test = require('ava')
const td = require('testdouble')
const yaml = require('js-yaml')
const encoder = require('../lib/encoder')

test.afterEach(t => td.reset()) // eslint-disable-line no-unused-vars

test('for() should return encoder for yaml', t => {
  const encoders = ['Yaml', 'yaml', 'yml'].map(encoder.for)
  const allEncodersAreValid = encoders.every(p => p === yaml.safeDump)
  t.true(allEncodersAreValid)
})

test('for() should return encoder for json', t => {
  const encoders = ['Json', 'json', 'JSON'].map(encoder.for)
  const allEncodersAreValid = encoders.every(p => p === JSON.stringify)
  t.true(allEncodersAreValid)
})

test('for() should return null for unsupported format', t => {
  t.is(encoder.for('txt'), null)
})

test('save() should reject format not supported', async t => {
  const err = await t.throws(encoder.save({}, 'test.txt', 'txt'))
  t.is(err.message, 'Unsupported format \'txt\'')
})

test('save() should reject if file cannot be written', async t => {
  const writeFile = td.function()
  td.when(writeFile(td.matchers.anything(), td.matchers.anything()))
    .thenCallback(new Error('no such file or directory'))
  td.replace(fs, 'writeFile', writeFile)
  const err = await t.throws(encoder.save({}, 'write-test.json', 'json'))
  t.regex(err.message, /no such file or directory/)
})

test('save() should write JSON file', async t => {
  const writeFile = td.function()
  td.when(writeFile(td.matchers.anything(), td.matchers.anything())).thenCallback()
  td.replace(fs, 'writeFile', writeFile)
  await t.notThrows(encoder.save({foo: 'bar'}, 'write-test.json', 'json'))
  td.verify(writeFile('write-test.json', '{"foo":"bar"}', td.matchers.isA(Function)))
})

test('save() should write YAML file', async t => {
  const writeFile = td.function()
  td.when(writeFile(td.matchers.anything(), td.matchers.anything())).thenCallback()
  td.replace(fs, 'writeFile', writeFile)
  await t.notThrows(encoder.save({foo: 'bar'}, 'write-test.yaml', 'yaml'))
  td.verify(writeFile('write-test.yaml', 'foo: bar\n', td.matchers.isA(Function)))
})
