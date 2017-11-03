const test = require('ava')
const lib = require('../lib')

test('lib should expose all modules', t => {
  t.truthy(lib.encoder)
  t.truthy(lib.integrator)
  t.truthy(lib.parser)
})
