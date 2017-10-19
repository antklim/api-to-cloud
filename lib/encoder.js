const fs = require('fs')
const yaml = require('js-yaml')

/**
 * The method saves payload object into file in a particular format.
 * @param  {Object} data    data to write to file
 * @param  {String} file    path to file to write
 * @param  {String} format  format to save payload in
 * @return {Promise}        resolves when payload written into the file
 */
exports.save = (data, file, format) => {
  const encoder = exports.for(format)

  if (!encoder) return Promise.reject(new Error(`Unsupported format '${format}'`))
  const payload = encoder(data)

  return new Promise((resolve, reject) => {
    fs.writeFile(file, payload, err => (err ? reject(err) : resolve()))
  })
}

/**
 * The method returns encoder for the format.
 * @param  {String} format file format to encode to
 * @return {Function}      encoder function or null
 */
exports.for = (format) => {
  switch (true) {
    case /yaml|yml/i.test(format): return yaml.safeDump
    case /json/i.test(format): return JSON.stringify
    default: return null
  }
}
