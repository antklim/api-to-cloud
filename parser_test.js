const test = require('ava')
const parser = require('./parser')

test.todo('parse() should call parseJson() when *.json file passed')
test.todo('parse() should call parseYaml() when *.yaml|yml file passed')

test.todo('parse() should resolve object when parseJson() succeed')
test.todo('parse() should resolve object when parseYaml() succeed')

test.todo('parse() should reject when parseJson() failed')
test.todo('parse() should reject when parseYaml() failed')

test('parseJson() should resolve object when succeed', t => {
  t.plan(1)
  return parser.parseJson('{"a": 1}').then(data => {
    t.deepEqual(data, {a: 1})
  })
})

test('parseJson() should reject when failed', t => {
  t.plan(1)
  return parser.parseJson('{"a":}')
    .then(() => t.fail('Should not parse'))
    .catch(err => {
      t.regex(err.message, /Unexpected token*/)
    })
})

test.todo('parseYaml() should resolve object when succeed')
test.todo('parseYaml() should reject when failed')

test.todo('toJson() should resolve JSON string when succeed')
test.todo('toJson() should reject when failed')

test.todo('toYaml() should resolve YAML string when succeed')
test.todo('toYaml() should reject when failed')
