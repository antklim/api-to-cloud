# API to Cloud
[![Build Status](https://travis-ci.org/antklim/api-to-cloud.svg?branch=master)](https://travis-ci.org/antklim/api-to-cloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=antklim/api-to-cloud&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&utm_medium=referral&utm_content=antklim/api-to-cloud&utm_campaign=Badge_Coverage)

This tool injects cloud specific integration points to API definition in Swagger.

## Installing
This is a NodeJS module available through the [npm](https://www.npmjs.com/) register.

Installation is done using the `npm install` command:

```
$ npm install @antklim/api-to-cloud
```

## Usage
After installation `api-to-cloud` CLI will be available in `node_modules/.bin`.
```
Usage: api-to-cloud [options]


  Options:

    -V, --version             output the version number
    -a, --api <path>          API definition file path
    -i, --integration <path>  API integration file path
    -o, --output <path>       path to output extended API file
    -f, --format [format]     output file format [yaml|yml|json], default 'yaml'
    -h, --help                output usage information
```

Run the following command to produce swagger file with AWS specific integration points:
```
$ node_modules/.bin/api-to-cloud --api test-api.yaml \
                                 --integration test-integration.yaml \
                                 --output aws.yaml
```

## Programmatic API
### parser
The `parser` module provides utilities for parsing of API and integration point descriptions. Currently supported two formats: YAML and JSON. It can be accessed using:
```javascript
const {parser} = require('api-to-cloud')
```

### parser.parse(file)
* `file` String - path to the file to parse
* Returns: Promise - resolves with the file data parsed into object

Example:
```javascript
parser.parse('input.yaml')
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(err => console.error(err))
```

### parser.for(format)
* `format` String - file format to parse
* Returns: Function - parser function or null

### encoder
The `encoder` module provides utilities for formatting and storing of API definition. Currently supported two formats: YAML and JSON. It can be accessed using:
```javascript
const {encoder} = require('api-to-cloud')
```

### encoder.save(data, file, format)
* `data` Object - data to write to file
* `file` String - path to file to write
* `format` String - format to save payload in
* Returns: Promise - resolves when payload written into the file

Example:
```javascript
encoder.save({'foo': 'bar'}, 'example.yaml', 'yaml')
  .then(() => console.log('Payload written into \'example.yaml\''))
  .catch(err => console.error(err))
```

### encoder.for(format)
* `format` String - file format to encode to
* Returns: Function - encoder function or null

### integrator
The `integrator` module provides utilities for merging pure API description in `Swagger` format with cloud specific integration points. It can be accessed using:
```javascript
const {integrator} = require('api-to-cloud')
```

### integrator.extend(api, integrationPaths)
* `api` Object - Swagger API definition
* `integrationPaths` Object - cloud integration points to add to API
* Returns: Object - extended Swagger API (API + integrations)

Format of the integration points object:
```yaml
path:
  method:
    integrationPointA: ...
```

Example of integration object:
```yaml
/pets:
  get:
    x-amazon-apigateway-integration:
      responses:
        default:
          statusCode: "200"
      requestTemplates:
        application/json: "{\"statusCode\": 200}"
      passthroughBehavior: "when_no_match"
      type: "mock"
  post:
    x-amazon-apigateway-integration:
      responses:
        default:
          statusCode: "200"
      requestTemplates:
        application/json: "{\"statusCode\": 200}"
      passthroughBehavior: "when_no_match"
      type: "mock"
/pets/{petId}:
  get:
    x-amazon-apigateway-integration:
      responses:
        default:
          statusCode: "200"
      requestTemplates:
        application/json: "{\"statusCode\": 200}"
      passthroughBehavior: "when_no_match"
      type: "mock"
```

## Built With
* [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser/encoder for JavaScript
* [ava](https://github.com/avajs/ava) - Futuristic test runner
* [ESLint](https://eslint.org/) - JavaScript linting utility
* [testdouble](https://github.com/testdouble/testdouble.js) - JavaScript test mocking library

## Authors
* [Anton Klimenko](https://github.com/antklim)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/antklim/api-to-cloud/blob/master/LICENSE) file for details
