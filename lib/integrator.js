const clone = require('clone')
const obp = require('object-path')

/**
 * The method extends pure API (swagger) definition with integrations and
 * returns enriched API definition.
 * @param  {Object} api              swagger API definition
 * @param  {Object} integrationPaths integrations definition to add to API
 * @param  {String} cloud            target cloud provider, [AWS]
 * @return {Object}                  swagger API + integrations
 */
exports.extend = (api, integrationPaths, cloud) => {
  const extendedApi = exports.cloneClean(api, cloud)
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
 * The methods clones pure API (swagger) and returns object cleaned from the
 * features unsupported by the cloud provider.
 * @param  {Object} api   swagger API definition
 * @param  {String} cloud target cloud provider, [AWS]
 * @return {Object}       API definition cleaned from unsupported features
 */
exports.cloneClean = (api, cloud) => {
  const cleanApi = clone(api, false)
  const unsupportedFeatures = {
    AWS: ['definitions.*.properties.*.example'],
  }[cloud]

  if (!unsupportedFeatures) return cleanApi

  return cleanApi
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
