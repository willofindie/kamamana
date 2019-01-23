# Kamamana - Designed ReactJS Components

[![npm version](https://badge.fury.io/js/kamamana.svg)](https://www.npmjs.com/package/kamamana)
[![install size](https://badgen.net/bundlephobia/minzip/kamamana@latest)](https://bundlephobia.com/result?p=kamamana)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![linting: eslint](https://img.shields.io/badge/linting-eslint-463fd4.svg?style=flat)](https://github.com/eslint/eslint)
[![type-check: flow](https://img.shields.io/badge/type--check-flow-E8BD36.svg?style=flat)](https://github.com/facebook/flow/)

> Designed ReactJS Components for personal use.

Set of High-Order HTML Elements as React Components, with default theme set for them, which can also be customized to any extent required, keeping the bundle size for the project using this library small.

- All the current up-to-date list of supported components can be found here in `./src/components`

Main purpose of this library is to use latest CSS properties (like `flex` box etc.), without the thought of supporting old browsers, removing use of browser prefixes, thus keeping library (with current set of components) size small.

> I am hoping to keep it under `15Kb - 20Kb` at-max with all basic components and dependencies included.
> _Currently it has it's own icons present for testing, will later on remove them to reduce the size even more._

## 📦 Dependencies:

Just one small CSS-to-JS dependency, for creating components:

- [nano-css](https://github.com/streamich/nano-css) (0.5Kb + `addon` Sizes)

**PROS**:

- Small and flexible 5th gen CSS-to-JS module.
- Allows addons to levitate, various features of CSS-to-JS
- Helps in keeping our own libraries using it, small and precise, with help of some modules.

**CONS**:

- This library is very new in terms of other, so no gaurantee when the dev might stop working on it
- Could have used [styled-jsx](https://github.com/zeit/styled-jsx)(5kb at-max), but it was a real pain to make it work with storybook.

## 🖥 Environment Support

- Mordern Brower support only.

## 📦 Installation

```bash
npm install kamamana --save
```

## 🔨 Usage

```jsx
import { Button, Card, Flexbox, KamamanaProvider } from 'kamamana';

/* ... */

// Wrap your React App with KamamanaProvider for custom theme
const App = props => <KamamanaProvider kTheme={theme}>{/* App Children */}</KamamanaProvider>;

// Else, Use App as is, to use the default theme...
const App = props => {
  /* App Render */
};
```

This library also exposes the internal `nano-css` css-in-js engine
(only used `addons` and `nano`, for now it's just `jsx`, `rule`), for custom use, which helps in re-using the
library, whitout any custom `css-in-js` dependency, making overall parent project bundle size small (if used)...

```js
import { nano, rule, jsx } from 'kamamana';
```

For details on `jsx` addon usage, check out [Addon JSX](https://github.com/streamich/nano-css/blob/master/docs/jsx.md)

## ⌨️ Development

Uses [storybook](https://github.com/storybooks/storybook) for development

```bash
$ git clone git@github.com:willofindie/kamamana.git
$ cd kamamana
$ npm install
$ npm run storybook
```

Open your browser and visit http://127.0.0.1:9001
