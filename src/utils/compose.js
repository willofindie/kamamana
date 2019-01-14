/**
 * Composes Passed Functions from left to right
 * @param {Functions} fns Function Arguments, that is taken as an Array<Function>
 * @returns {Function} Composed Function, which accepts params similar to the left-most passed Function Arguments
 *    and Outputs the result from the right-most passed Function
 */
export default (...fns) => fns.reduce((composedFn, fn) => (...args) => fn(composedFn(...args)));
