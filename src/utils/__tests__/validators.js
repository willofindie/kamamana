import { isString, isNumber, isEmpty, isArray, isObject } from '/utils/validators';

it('validates string properly, isString(string)', () => {
  expect(isString('foo')).toBeTruthy();
  expect(isString(new String('foo'))).toBeTruthy();
  expect(isString(2)).toBeFalsy();
});

it('validates number properly, isNumber(number)', () => {
  expect(isNumber('foo')).toBeFalsy();
  expect(isNumber('1')).toBeTruthy();
  expect(isNumber(2)).toBeTruthy();
  expect(isNumber(new Number(2))).toBeTruthy();
});

it('validates emptiness, isEmpty(data)', () => {
  const foo = null;
  expect(isEmpty(foo)).toBeTruthy();
  expect(isEmpty('')).toBeTruthy();
  expect(isEmpty(0)).toBeFalsy();
  expect(isEmpty({})).toBeFalsy();
});

it('validates as an Array, isArray(array)', () => {
  expect(isArray(['foo'])).toBeTruthy();
  expect(isArray(new Array('foo'))).toBeTruthy();
  expect(isArray({})).toBeFalsy();
});

it('validates as Object, isObject(object)', () => {
  expect(isObject({ foo: 'bar' })).toBeTruthy();
  expect(isObject([])).toBeTruthy();
  expect(isObject(undefined)).toBeFalsy();
  expect(isObject(null)).toBeFalsy();
  expect(isObject(1)).toBeFalsy();
  expect(isObject('foo')).toBeFalsy();
  expect(isObject(true)).toBeFalsy();
  expect(isObject(new String('foo'))).toBeFalsy();
});
