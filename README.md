# Microsoft Power BI visuals ColorUtils
[![Build](https://github.com/microsoft/powerbi-visuals-utils-colorutils/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/microsoft/powerbi-visuals-utils-colorutils/actions/workflows/build.yml) [![npm version](https://img.shields.io/npm/v/powerbi-visuals-utils-colorutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-colorutils) [![npm](https://img.shields.io/npm/dm/powerbi-visuals-utils-colorutils.svg)](https://www.npmjs.com/package/powerbi-visuals-utils-colorutils)

> ColorUtils is a set of functions and classes in order to simplify color manipulations for Power BI custom visuals

## Usage
Learn how to install and use the ColorUtils in your custom visuals:
* [Usage Guide](https://docs.microsoft.com/en-us/power-bi/developer/visuals/utils-color)

## Development

Common scripts:

| Command | Description |
| --- | --- |
| `npm ci` | Install pinned dependencies from `package-lock.json` |
| `npm run build` | Compile `src/` into `lib/` with TypeScript declarations and source maps |
| `npm test` | Run the full Vitest suite once (used by CI) |
| `npm run test:watch` | Run Vitest in watch mode; re-runs affected tests on file change |
| `npm run test:coverage` | Run Vitest once and produce a coverage report under `coverage/` |
| `npm run test:typecheck` | Type-check the `test/` tree with TypeScript using `test/tsconfig.json` |
| `npm run lint` | Lint the codebase with ESLint flat config in `eslint.config.mjs` |
| `npm run lint:fix` | Auto-fix lint issues where possible |

### TypeScript configs

* `tsconfig.json` builds `src/` into `lib/`.
* `test/tsconfig.json` extends the main config, adds `vitest/globals`, and includes `test/` files.

### Tests

Tests live under `test/` and run on Vitest.

## Contributing
* Read our [contribution guideline](./CONTRIBUTING.md) to find out how to contribute bugs fixes and improvements
* [Issue Tracker](https://github.com/Microsoft/powerbi-visuals-utils-colorutils/issues)
* [Development workflow](./docs/dev/development-workflow.md)
* [How to build](./docs/dev/development-workflow.md#how-to-build)
* [How to run unit tests locally](./docs/dev/development-workflow.md#how-to-run-unit-tests-locally)

## License
See the [LICENSE](./LICENSE) file for license rights and limitations (MIT).
