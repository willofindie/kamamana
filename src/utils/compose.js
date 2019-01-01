export default (...fns: Array<Function>) =>
  fns.reduce((composedFn, fn) => (...args) => fn(composedFn(...args)));
