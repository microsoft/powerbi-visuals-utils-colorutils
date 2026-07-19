## 7.0.0

### Breaking changes
* Public API: `parseColorString` now returns `RgbColor | undefined` (previously `RgbColor`); callers must handle `undefined` for unparseable color strings.
* Public API: `getThemeColor` and `getHighContrastColor` now return `string | undefined` (previously `string`) when the color palette is not available.
* Public API: `LinearColorScale` and `createLinearColorScale` now return `string | undefined` (previously `string`); the scale returns `undefined` for `NaN` values.
* Public API: `getColorForSeriesValue` and `getColorForMeasure` now throw an `Error` when the color palette is not initialized (previously failed with a raw `TypeError`). Constructing `ColorHelper` without a palette remains supported for probing `isHighContrast`/`getThemeColor`; only the color-allocating methods require a palette.
* Behavior: in high-contrast mode, `getColorForSeriesValue`/`getColorForMeasure` now fall through to the fill/default/palette color when the theme color is empty or `undefined` (previously the theme color was returned unconditionally). Avoids a silent empty-string fallback.
* Test runner migrated from Karma + Jasmine to Vitest.
* Development/build TypeScript upgraded to 6.x.

### Changed
* `powerbi-visuals-api` remains on ^5.11.0.
* `powerbi-visuals-utils-typeutils` updated to ^7.0.0.
* CI/development baseline updated to Node.js 20.x.

### Infrastructure
* Lint stack migrated to ESLint 10 flat config.
* CI workflows modernized to `actions/*@v6` and Node 20/22 matrix.
* Custom CodeQL workflow updated to Node 20 and modern action versions.
* Added Dependabot configuration for npm and GitHub Actions.

## 6.0.6
* Updated packages

## 6.0.5
* Updated packages
* powerbi-visuals-api update to 5.11.0

## 6.0.4
* powerbi-visuals-api update to 5.9.0

## 6.0.3
* Update powerbi-visuals-utils-testutils to 6.0.3

## 6.0.2
* Vulnerabilities fixed
* Packages update
* Update build.yml to use node 18, 20

## 6.0.1
* Packages update
* Removed coveralls

## 6.0.0
* Updated packages
* Vulnerabilities fixes

## 3.0.0
* Migrated to ESlint
* Migrated to Playwright
* Packages update
* Vulnerabilities fixes

## 2.3.1
* Packages update
* Vulnerabilities fixes

## 2.3.0
* Packages update
* JQuery dependency removed
* Obsolete docs removed
* Github actions added

## 2.2.1
* Packages update

## 2.2.0
* Update packages to fix vulnerabilities
* Update powerbi-visuals-api to 2.6.0

## 2.1.0
* Update packages to fix vulnerabilities

## 1.0.0
* Update packages
* Unified dependencies versions
