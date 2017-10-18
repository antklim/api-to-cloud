const test = require('ava')
const integrator = require('../lib/integrator')

test.beforeEach(t => {
  t.context.api = require('./fixtures/test-api.json')
  t.context.integrations = require('./fixtures/test-integration.json')
})

test('extend()', t => {
  const expected = {
    paths: {
      '/path1': {
        get: {
          description: 'get path1',
          parameters: [],
          responses: {},
          integrationA: 'integrationABody',
          integrationB: 'integrationBBody',
        },
        post: {
          description: 'post path1',
          parameters: [],
          responses: {},
          integrationC: 'integrationCBody',
        },
        put: {
          description: 'put path1',
          parameters: [],
          responses: {},
        },
      },
      '/path2': {
        get: {
          description: 'get path2',
          parameters: [],
          responses: {},
        },
        delete: {
          description: 'delete path2',
          parameters: [],
          responses: {},
          integrationD: 'integrationDBody',
        },
      },
    },
  }
  const actual = integrator.extend(t.context.api, t.context.integrations)
  t.deepEqual(actual, expected)
  t.true(actual != t.context.api, 'extend() should not mutate api object, but return a new extended object')
})

test('reduceIntegrations() should reduce object into tuples', t => {
  const expected = [
    ['/path1.get', {integrationA: 'integrationABody', integrationB: 'integrationBBody'}],
    ['/path1.post', {integrationC: 'integrationCBody'}],
    ['/path2.delete', {integrationD: 'integrationDBody'}],
    ['/path2.put', {integrationE: 'integrationEBody'}],
  ]

  t.deepEqual(integrator.reduceIntegrations(t.context.integrations), expected)
})
