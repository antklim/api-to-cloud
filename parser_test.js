const test = require('ava')
const yaml = require('js-yaml')
const path = require('path')
const parser = require('./parser')

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

test('parse() should reject format not supported', t => {
  return parser.parse(path.join(__dirname, 'data', 'test.txt'))
    .catch(err => {
      t.is(err.message, 'Unsupported format \'txt\'')
    })
})

test('parse() should reject file cannot be read', t => {
  return parser.parse(path.join(__dirname, 'data', 'test1.json'))
    .catch(err => {
      t.regex(err.message, /no such file or directory/)
    })
})

test('parse() should reject when corrupted JSON passed', t => {
  return parser.parse(path.join(__dirname, 'data', 'test-fail.json'))
    .catch(err => {
      t.regex(err.message, /Unexpected token/)
    })
})

test('parse() should reject when corrupted YAML passed', t => {
  return parser.parse(path.join(__dirname, 'data', 'test-fail.yaml'))
    .catch(err => {
      t.regex(err.message, /bad indentation/)
    })
})

test('parse() should resolve object from JSON', t => {
  return parser.parse(path.join(__dirname, 'data', 'test.json'))
    .then(data => {
      t.deepEqual(data, {a: 1})
    })
})

test('parse() should resolve object from YAML', t => {
  return parser.parse(path.join(__dirname, 'data', 'test.yaml'))
    .then(data => {
      t.deepEqual(data, {a: 1, b: {c: 2}})
    })
})

test('toJson() should return JSON string', t => {
  t.is(parser.toJson({a: 1, b: {c: 'abc'}}), '{"a":1,"b":{"c":"abc"}}')
})

test('toYaml() should return YAML', t => {
  t.is(parser.toYaml({a: 1, b: {c: 'abc'}}), 'a: 1\nb:\n  c: abc\n')
})
