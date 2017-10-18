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

  integrations.forEach(([path, integration]) => {
    const fullPath = `paths.${path}`
    const integrationPoint = obp.get(extendedApi, fullPath)
    if (integrationPoint) {
      Object.assign(integrationPoint, integration)
    }
  })

  return extendedApi
}

/**
 * The method reduces an integration object and returns an array of tuples
 * (path, integrations).
 * @param  {Object} paths integrations for API path/method
 * @return {array}        array of tuples (full path, integrations)
 */
exports.reduceIntegrations = paths =>
  Object.entries(paths).reduce((accumulator, [path, methods]) => {
    const mapper = ([method, integrations]) => [`${path}.${method}`, integrations]
    return accumulator.concat(Object.entries(methods).map(mapper))
  }, [])
