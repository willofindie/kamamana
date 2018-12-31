## Code Style, Type Checking and Linting:

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![linting: eslint](https://img.shields.io/badge/linting-eslint-463fd4.svg?style=flat)](https://github.com/eslint/eslint)
[![type-check: flow](https://img.shields.io/badge/type--check-flow-E8BD36.svg?style=flat)](https://github.com/facebook/flow/)

### Type Checking

Using [Flow Types](https://flow.org) for type-checks, instead of `prop-types`, as it is more robust. Well, there are few cons of it too. Some of them, which I felt exist was:

- It has a bit of a learning curve...
- Not well supported yet by Rollup, for extracting it out of your library.
  - [rollup-pugin-flow](https://github.com/leebyron/rollup-plugin-flow), to extract out flow types from library, but there's some
    issue with this library, as it is not able to properly create source.maps for the build. Will figure it out someday, or someone else will.
  - [rollup-plugin-flow-entry](https://github.com/swansontec/rollup-plugin-flow-entry), Cudn't use this becoz of above issue.
- Not many libraries out there have flow-types inbuilt like `typescript`. Well figured a workaround for it later, using [flow-typed](https://github.com/flow-typed/flow-typed) to create dummy type stubs for modules being used.
- Not sure how to make it work with `examples` in this repo.

### Code Style / Linting

- ESLint
- Prettier
