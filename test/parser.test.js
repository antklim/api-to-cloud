const test = require('ava')
const yaml = require('js-yaml')
const path = require('path')
const parser = require('../lib/parser')

test('for() should return parser for yaml', t => {
  const parsers = ['Yaml', 'yaml', 'yml'].map(parser.for)
  const allParsersAreValid = parsers.every(p => p === yaml.safeLoad)
  t.true(allParsersAreValid)
})

test('for() should return parser for json', t => {
  const parsers = ['Json', 'json', 'JSON'].map(parser.for)
  const allParsersAreValid = parsers.every(p => p === JSON.parse)
  t.true(allParsersAreValid)
})

test('for() should return null for unsupported format', t => {
  t.is(parser.for('txt'), null)
})

test('parse() should reject format not supported', async t => {
  const err = await t.throws(parser.parse(path.join(__dirname, 'fixtures', 'test.txt')))
  t.is(err.message, 'Unsupported format \'txt\'')
})

test('parse() should reject file cannot be read', async t => {
  const err = await t.throws(parser.parse(path.join(__dirname, 'fixtures', 'test1.json')))
  t.regex(err.message, /no such file or directory/)
})

test('parse() should reject when corrupted JSON passed', async t => {
  const err = await t.throws(parser.parse(path.join(__dirname, 'fixtures', 'test-fail.json')))
  t.regex(err.message, /Unexpected token/)
})

test('parse() should reject when corrupted YAML passed', async t => {
  const err = await t.throws(parser.parse(path.join(__dirname, 'fixtures', 'test-fail.yaml')))
  t.regex(err.message, /bad indentation/)
})

test('parse() should resolve object from JSON', async t => {
  t.deepEqual(await parser.parse(path.join(__dirname, 'fixtures', 'test.json')), {a: 1})
})

test('parse() should resolve object from YAML', async t => {
  t.deepEqual(await parser.parse(path.join(__dirname, 'fixtures', 'test.yaml')), {a: 1, b: {c: 2}})
})
