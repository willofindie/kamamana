# Kamamana - Designed ReactJS Components

> Designed ReactJS Components for personal use.

It's kind of a set of High order HTML Elements, with default theme set for them, which can also be customized to any extent required, keeping the bundle size for the project using this library small.
All the current up-to-date list of supported components can be found here in `./src/components`

Since, this library is free from restrictions to work with old IE browsers, It's main goal is to keep the components
use all the latest CSS3 supported properties like `flex` box etc. For now, browser prefixes are not present in this library, making
this library (with current set of components) sized to `7Kb` in total (gzipped).

> I am hoping to keep it under `15Kb - 20Kb` at-max with all basic components and dependencies included.
> _Currently it has it's own icons present for testing, will later on remove them to reduce the size even more._

**Usage**:

```js
import { Button, Card, Flexbox } from 'kamamana';
```

This Library also exposes the internal `nano-css` engine (only the used `addons`, for now it's just `jsx`), for custom use, which helps in re-using the
library, whitout any custom `css-in-js` dependency for parent project

```js
import { jsx } from 'kamamana';
```

For details on `jsx` addon usage, check out [Addon JSX](https://github.com/streamich/nano-css/blob/master/docs/jsx.md)

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

## Amazing React Components (to reuse)

> NOTE: Reusable components for work:

- [React Dates](http://airbnb.io/react-dates)
