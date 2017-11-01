# API to Cloud
[![Build Status](https://travis-ci.org/antklim/api-to-cloud.svg?branch=master)](https://travis-ci.org/antklim/api-to-cloud)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=antklim/api-to-cloud&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/51abe20086ae49f6948eb99d3e574d0b)](https://www.codacy.com/app/anton-klimenko/api-to-cloud?utm_source=github.com&utm_medium=referral&utm_content=antklim/api-to-cloud&utm_campaign=Badge_Coverage)

This tool injects cloud specific integration points to API definition in Swagger.

## Usage
```
$ node lib/index.js --api pure-api.yaml --integration cloud-integration.yaml --output cloud-api.yaml
```
