// https://github.com/facebook/flow/issues/7318, for details on predicate flow functions
export const isString = (string: mixed): boolean %checks =>
  typeof string === 'string' || string instanceof String;

export const isEmpty = (data: mixed): boolean %checks =>
  data === null || data === undefined || (isString(data) && data === '');

export const isNumber = (number: mixed): boolean %checks =>
  (typeof number === 'string' && !isNaN(parseInt(number))) ||
  typeof number === 'number' ||
  number instanceof Number;

export const isArray = (array: mixed): boolean %checks =>
  typeof array === 'object' && array instanceof Array;

export const isObject = (obj: mixed): boolean %checks => typeof obj === 'object';
