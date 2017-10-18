const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * The method parses file. The following file types are supported: YAML, JSON.
 * @param  {String} file path to the file to parse
 * @return {Promise}     resolves with the file data parsed into object
 */
exports.parse = (file) => {
  const format = path.extname(file).substring(1)
  const parser = exports.for(format)

  if (!parser) return Promise.reject(new Error(`Unsupported format '${format}'`))

  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return reject(err)

      try {
        return resolve(parser(data))
      } catch (e) {
        return reject(e)
      }
    })
  })
}

/**
 * The method returns parser for the format.
 * @param  {String} format file format to parse
 * @return {Function}      parser function or null
 */
exports.for = (format) => {
  switch (true) {
    case /yaml|yml/i.test(format): return yaml.safeLoad
    case /json/i.test(format): return JSON.parse
    default: return null
  }
}

/**
 * The method converts data object into JSON string.
 * @param  {Object} data data object
 * @return {String}      JSON string representation of data
 */
exports.toJson = data => JSON.stringify(data)

/**
 * The method converts data object into YAML string.
 * @param  {Object} data data object
 * @return {String}      YAML string representation of data
 */
exports.toYaml = data => yaml.safeDump(data)
