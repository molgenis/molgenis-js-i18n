# [1.0.0](https://github.com/molgenis/molgenis-js-i18n/compare/v0.2.1...v1.0.0) (2020-12-07)


### chore

* Switch from moment to dayjs ([a0ebef2](https://github.com/molgenis/molgenis-js-i18n/commit/a0ebef243220185ad0d0e5651cb9a34e31c87ed3))
* Switch from moment to dayjs ([68a7cbd](https://github.com/molgenis/molgenis-js-i18n/commit/68a7cbd423568020db4fcfd146f0b4ffc593d9d8))


### BREAKING CHANGES

* moment is no longer set as filter on Vue instead dayjs is now set
* moment is no longer set as filter on Vue instead dayjs is now set

## [0.2.1](https://github.com/molgenis/molgenis-js-i18n/compare/v0.2.0...v0.2.1) (2019-06-07)


### Bug Fixes

* fix CI Build, set unsave perm to true ([192d5fc](https://github.com/molgenis/molgenis-js-i18n/commit/192d5fc))

# [0.2.0](https://github.com/molgenis/molgenis-js-i18n/compare/v0.1.0...v0.2.0) (2019-05-31)


### Bug Fixes

* **package.json:** updated repo URL to molgenis ([8de98f8](https://github.com/molgenis/molgenis-js-i18n/commit/8de98f8))
* **semantic-deps:** add plugins for auto release ([93fee3f](https://github.com/molgenis/molgenis-js-i18n/commit/93fee3f))


### Features

* **autorelease:** added autorelease ([cd8dc05](https://github.com/molgenis/molgenis-js-i18n/commit/cd8dc05))

<a name="0.1.1"></a>
## 0.1.1 (2018-04-16)
* Remove es6 syntax from production build 


<a name="0.1.0"></a>
## 0.1.0 (2018-04-11)
* Allow multiple namespaces, the default namespace is the first namespace in the list.
* Use webpack for test and dev, use rollup for production build
* Use vue-test-utils for testing


<a name="0.0.3"></a>
## 0.0.3 (2017-04-09)
* Simplified the code, user language is known on page load
* Make namespace configurable in plugin options
