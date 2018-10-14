export const isString = string => typeof string === 'string' || string instanceof String;

export const isEmpty = data => data === null || data === undefined || isNaN(data);

export const isNumber = number => typeof number === 'number' || number instanceof Number;

export const isArray = array => typeof array === 'object' && array instanceof Array;

export const isObject = obj => typeof obj === 'object';
