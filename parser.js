'use strict'

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * The method parses file. The following file types are supported: YAML, JSON.
 *
 * file <String> - path to the file to parse
 *
 * return <Promise> - resolves with the file data parsed into object
 *                  - rejects when file is unawailable or parse failed
 */
exports.parse = file => {
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

exports.for = format => {
  switch (true) {
    case /yaml|yml/i.test(format): return yaml.safeLoad
    case /json/i.test(format): return JSON.parse
    default: return null
  }
}

/**
 * The method converts data object into JSON string.
 *
 * data <Object> - data object
 *
 * return <Promise> - resolves with the JSON string representation of data
 *                  - rejects when failed
 */
exports.toJson = data => {}

/**
 * The method converts data object into YAML string.
 *
 * data <Object> - data object
 *
 * return <Promise> - resolves with the JSON string representation of data
 *                  - rejects when failed
 */
exports.toYaml = data => {}
