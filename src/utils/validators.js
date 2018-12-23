export const isString = (string: any) => typeof string === 'string' || string instanceof String;

export const isEmpty = (data: any) =>
  data === null || data === undefined || (typeof data === 'number' && isNaN(data));

export const isNumber = (number: any) => typeof number === 'number' || number instanceof Number;

export const isArray = (array: any) => typeof array === 'object' && array instanceof Array;

export const isObject = (obj: any) => typeof obj === 'object';
