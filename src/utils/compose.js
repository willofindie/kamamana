export default (...fns: Array<Function>) =>
  fns.reduce((composedFn, fn) => (...args: Array<any>) => fn(composedFn(...args)));
