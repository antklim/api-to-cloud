# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] - 2017-11-04
### Added
- Swagger features which are not supported by AWS will be removed from the output file
- `cloud` parameter added to `CLI`, default 'AWS'
- `cloud` parameter added to the method `integrator.extend`:

  Now:
  ```javascript
  integrator.extend(api, integrationPaths, cloud)
  ```
  Before:
  ```javascript
  integrator.extend(api, integrationPaths)
  ```

## [0.1.1] - 2017-11-03
### Added
- Coverage tests for `CLI`

## [0.1.0] - 2017-11-02
### Added
- `CLI` and `Programmatic API` to integrate Swagger API definition with cloud specific extensions
