# API to Cloud
[![Build Status](https://travis-ci.org/antklim/api-to-cloud.svg?branch=master)](https://travis-ci.org/antklim/api-to-cloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=antklim/api-to-cloud&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&utm_medium=referral&utm_content=antklim/api-to-cloud&utm_campaign=Badge_Coverage)

This tool injects cloud specific integration points to API definition in Swagger.

## Installing
This is a NodeJS module available through the [npm](https://www.npmjs.com/) register.

Installation is done using the `npm install` command:

```
$ npm install api-to-cloud --save
```

You can also clone [api-to-cloud](https://github.com/antklim/api-to-cloud) repository and run tests, coverage and linter:
```
$ git clone git://github.com/antklim/api-to-cloud.git
$ cd api-to-cloud
$ npm install
$ npm run lint
$ npm test
```

## Usage
```
$ ./cli.js --api pure-api.yaml \
           --integration cloud-integration.yaml \
           --output cloud-api.yaml
```

## API Reference

## Built With
* [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser/encoder for JavaScript
* [ava](https://github.com/avajs/ava) - Futuristic test runner
* [ESLint](https://eslint.org/) - JavaScript linting utility
* [testdouble](https://github.com/testdouble/testdouble.js) - JavaScript test mocking library

## Authors
* [Anton Klimenko](https://github.com/antklim)

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/antklim/api-to-cloud/blob/master/LICENSE) file for details
