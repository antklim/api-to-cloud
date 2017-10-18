'use strict'

const clone = require('clone')
const obp = require('object-path')

/**
 * The method extends pure API (swagger) definition with integrations and
 * returns enriched API definition.
 * @param  {Object} api              swagger API definition
 * @param  {Object} integrationPaths integrations definition to add to API
 * @return {Object}                  swagger API + integrations
 */
exports.extend = (api, integrationPaths) => {
  const extendedApi = clone(api, false)
  const integrations = exports.reduceIntegrations(integrationPaths)

  for (let [path, integration] of integrations) {
    const fullPath = `paths.${path}`
    const integrationPoint = obp.get(extendedApi, fullPath)
    if (!integrationPoint) continue
    Object.assign(integrationPoint, integration)
  }

  return extendedApi
}

/**
 * The method reduces an integration object and returns an array of tuples
 * (path, integrations).
 * @param  {Object} paths integrations for API path/method
 * @return {array}        array of tuples (full path, integrations)
 */
exports.reduceIntegrations = paths => {
  return Object.entries(paths).reduce((accumulator, [path, methods]) => {
    const arr = Object.entries(methods).map(([method, integrations]) => [`${path}.${method}`, integrations])
    return accumulator.concat(arr)
  }, [])
}
