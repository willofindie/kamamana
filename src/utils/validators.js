// https://github.com/facebook/flow/issues/7318, for details on predicate flow functions

/**
 * @param {any} string Accepts any type of argument
 * @returns {boolean} If is a proper string return `true`
 */
export const isString = string => typeof string === 'string' || string instanceof String;

/**
 * NOTE: Doesn't validate for NaN values for now...
 * @param {any} data Accepts any type of argument
 * @returns {boolean} If data is null/undefined/empty string, returns true
 */
export const isEmpty = data =>
  data === null || data === undefined || (isString(data) && data === '');

/**
 * Checks for a string | number, to be proper Number type
 * @param {any} number Accepts any type of argument
 * @returns {boolean} `true` if passed argument is a proper number
 */
export const isNumber = number =>
  (typeof number === 'string' && !isNaN(parseInt(number))) ||
  typeof number === 'number' ||
  number instanceof Number;

/**
 * @param {any} array Accepts any type of argument
 * @returns {boolean} `true` if passed argument is Array type
 */
export const isArray = array => typeof array === 'object' && array instanceof Array;

/**
 * Passes only for Array|Object.
 * @param {any} obj Accepts any type of argument
 * @returns {boolean} `true` if passed argument is Object type, which is true for evry non-primitive type of variables in js
 */
export const isObject = obj =>
  obj != null &&
  !(obj instanceof String || obj instanceof Number || obj instanceof Boolean) &&
  typeof obj === 'object';
