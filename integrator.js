'use strict'

const clone = require('clone')
const obp = require('object-path')

exports.extend = (api, integrationPaths) => {
  const extendedApi = clone(api, false)
  const integrations = exports.reduceIntegrations(integrationPaths)

  for (let [path, integration] of integrations) {
    const fullPath = `paths.${path}`
    if (!obp.has(extendedApi, fullPath)) continue
    obp.push(extendedApi, fullPath, integration)
  }

  return extendedApi
}


/**
 * The method reduces an integration object and returns an array of tuples
 * (path, integrations).
 *
 * integration <Object> - integration data
 *
 * return <Array> - array of tuples (path, integration)
 */
exports.reduceIntegrations = paths => {
  return Object.entries(paths).reduce((accumulator, [path, methods]) => {
    const arr = Object.entries(methods).map(([method, integrations]) => [`${path}.${method}`, integrations])
    return accumulator.concat(arr)
  }, [])
}
