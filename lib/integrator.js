const clone = require('clone')
const obp = require('object-path')
const traverse = require('traverse')

const UNSUPPORTED_FEATURES = {
  AWS: ['definitions.*.properties.*.example', 'paths.*.*.responses.default'],
}

/**
 * The method extends pure API (swagger) definition with integrations and
 * returns enriched API definition.
 * @param  {Object} api              swagger API definition
 * @param  {Object} integrationPaths integrations definition to add to API
 * @param  {String} cloud            target cloud provider, [AWS]
 * @return {Object}                  swagger API + integrations
 */
exports.extend = (api, integrationPaths, cloud) => {
  const extendedApi = exports.cleanApi(api, UNSUPPORTED_FEATURES[cloud])
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
 * @param  {Object} api        swagger API definition
 * @param  {Array}  removables the list of paths to remove from the API description
 * @return {Object}            cleaned API definition
 */
exports.cleanApi = (api, removables) => {
  const cleanApi = clone(api, false)

  if (!removables) return cleanApi

  const paths = traverse(cleanApi).paths()

  removables.forEach((removable) => {
    const pathToDelete = removable.split('.')
    // filter matching paths
    paths.filter(path =>
      path.length === pathToDelete.length &&
      path.every((element, idx) => pathToDelete[idx] === element || pathToDelete[idx] === '*'))
      // and remove unsupported features
      .forEach(path => obp.del(cleanApi, path))
  })

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
