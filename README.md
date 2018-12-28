# Kamamana - Designed ReactJS Components

> Designed ReactJS Components for personal use.

## Dependencies:

Just one small CSS-to-JS dependency, for creating components:

- [nano-css](https://github.com/streamich/nano-css) (0.5Kb + `addon` Sizes, for now it's 5Kb in total in my use)

**PROS**:

- Small and flexible 5th gen CSS-to-JS module.
- Allows addons to levitate, various features of CSS-to-JS
- Helps in keeping our own Libraries using it, small and precise, with help of some modules.

**CONS**:

- This library is very new in terms of other, so no gaurantee when the dev might stop working on it
- Could have used [styled-jsx](https://github.com/zeit/styled-jsx)(5kb at-max), but it was a real pain to make it work with storybook.

## Type checking and Linting:

### Type Checking

Using [Flow Types](https://flow.org) for type-checks, instead of `prop-types`, as it is more robust. Well, there are few cons of it too. Some of them, which I felt exist was:

- It has a bit of a learning curve...
- Not well supported yet by Rollup, for extracting it out of your library.
  - [rollup-pugin-flow](https://github.com/leebyron/rollup-plugin-flow), to extract out flow types from library, but there's some
    issue with this library, as it is not able to properly create source.maps for the build. Will figure it out someday, or someone else will.
  - [rollup-plugin-flow-entry](https://github.com/swansontec/rollup-plugin-flow-entry), Cudn't use this becoz of above issue.
- Not many libraries out there have flow-types inbuilt like `typescript`. Well figured a workaround for it later, using [flow-typed](https://github.com/flow-typed/flow-typed) to create dummy type stubs for modules being used.
- Not sure how to make it work with `examples` in this repo.

### Linting

- ESLint
- Prettier

## Amazing React Components (to reuse)

> NOTE: Reusable components for work:

- [React Dates](http://airbnb.io/react-dates)
