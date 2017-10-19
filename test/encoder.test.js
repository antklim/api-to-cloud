const test = require('ava')
const yaml = require('js-yaml')
const path = require('path')
const encoder = require('../lib/encoder')

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
  const err = await t.throws(encoder.save({}, path.join(__dirname, 'fixtures', 'test.txt'), 'txt'))
  t.is(err.message, 'Unsupported format \'txt\'')
})

// TODO: use sinon for the following tests
test.skip('save() should reject if file cannot be written', async t => {
  const err = await t.throws(encoder.save({}, path.join(__dirname, 'fixtures', 'write-test.json'), 'json'))
  t.regex(err.message, /no such file or directory/)
})

test.skip('save() should write JSON file', async t => {
  t.deepEqual(await t.throws(encoder.save({}, path.join(__dirname, 'fixtures', 'write-test.json'), 'json')))
})

test.skip('save() should write YAML file', async t => {
  t.deepEqual(await t.throws(encoder.save({}, path.join(__dirname, 'fixtures', 'write-test.yaml'), 'yaml')))
})
