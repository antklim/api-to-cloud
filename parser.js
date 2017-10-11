/**
 * The method parses file. The following file types are supported: YAML, JSON.
 *
 * file <String> - path to the file to parse
 *
 * return <Promise> - resolves with the file data parsed into object
 *                  - rejects when file is unawailable or parse failed
 */
exports.parse = file => {}

/**
 * The method parses file data as JSON.
 *
 * file <String> - file data
 *
 * return <Promise> - resolves with the file data parsed into object
 *                  - rejects when parse failed
 */
exports.parseJson = file => {
  try {
    const data = JSON.parse(file)
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * The method parses file data as YAML.
 *
 * file <String> - file data
 *
 * return <Promise> - resolves with the file data parsed into object
 *                  - rejects when parse failed
 */
exports.parseYaml = file => {}

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
