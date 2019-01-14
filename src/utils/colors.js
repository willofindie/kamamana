import compose from './compose';
import { isString } from '/utils/validators';
// Help taken from - https://stackoverflow.com/a/5624139/2849127

/**
 * type Color: { r: number, g: number, b: number }
 */

/**
 * Tests for emptiness for strings and numbers only...
 * For empty object, collection, map, or set, use `lodash.isEmpty`
 */
export const isEmptyWithoutZero = value => {
  return typeof value === 'string' || value instanceof String
    ? value.length === 0
    : value === undefined || value === null || isNaN(value);
};

/**
 * Returns and array of [r, g, b], else []
 * @param {string} rgbString RGB string of format rgb(r, g, b)
 */
export const splitRGBfromRGBString = rgbString => {
  const result = /^rgb\(\s*?(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/i.exec(rgbString);
  return result ? result.splice(1) : [];
};

/**
 * Returns Decimal value for Hex strings
 * @param {string} hexString three/six characters hex string to convert to decimal number array
 * @returns {Array} Decimal Integers for Hex Values
 */
export const extractIntegerFromHexString = hexString => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const _hex =
    hexString && hexString.replace(shorthandRegex, (m, r, g, b) => `#${r + r}${g + g}${b + b}`);
  const result = _hex ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex) : [];
  return result ? result.splice(1).map(val => parseInt(val, 16)) : [];
};

/**
 * @param {number} c Convert a Decimal number from 0 - 255, to it's respective hex value
 * @returns {string} Hex Value of a passed decimal value
 */
export const componentToHex = c => {
  if (c / 255 < 0 || c / 255 > 1) {
    return null;
  }
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Excepts a string of format `rgb(r, g, b)`
 * @param {string | object} rgb RGB CSS String or Color Object to convert to Hex
 * @returns {string} CSS compatible Hex string
 */
export const rgbToHex = rgb => {
  let r, g, b;
  if (!rgb) {
    return null;
  }
  if (typeof rgb === 'string') {
    [r, g, b] = splitRGBfromRGBString(rgb).map(val => componentToHex(parseInt(val)));
  } else if (typeof rgb === 'object' && rgb.hasOwnProperty('r')) {
    r = componentToHex(parseInt(rgb.r));
    g = componentToHex(parseInt(rgb.g));
    b = componentToHex(parseInt(rgb.b));
  }
  return r && g && b ? `#${r}${g}${b}` : null;
};

/**
 * @param {string} hex CSS Compatible Hex String
 * @returns {object} Color Object {r, g, b}
 */
export const hexToRgb = hex => {
  const [r, g, b] = extractIntegerFromHexString(hex);
  return !isNaN(r) && !isNaN(g) && !isNaN(b) ? { r, g, b } : null;
};

/**
 * Converts the number to be in the range from 0 - 100
 * @param {number} amount any number
 * @return {number} Amount between 0 - 100
 */
export const getBoundedChangeAmount = amount => {
  const _amount = amount < 0 ? 0 : amount > 100 ? 100 : amount;
  return (_amount / 100) * 255;
};

/**
 * Shader helps in Lighten / Darken the Color by the given amount.
 * NOTE: This method is not the efficient way for lightening the colors.. Will understand and figure things out later
 * v0.1 :P
 * It's easiest possible way to shade colors, help taken from https://stackoverflow.com/a/13542669/2849127
 * @param {object} color Color Object
 * @param {number} amount Percent Value between 0 - 100, by which shader should lighten/darken the color
 */
export const shader = (color, amount) => {
  if (
    color &&
    color.hasOwnProperty('r') &&
    color.hasOwnProperty('g') &&
    color.hasOwnProperty('b')
  ) {
    let { r, g, b } = color;
    r = r + amount;
    g = g + amount;
    b = b + amount;
    return {
      r: r > 255 ? 255 : r < 0 ? 0 : Math.round(r),
      g: g > 255 ? 255 : g < 0 ? 0 : Math.round(g),
      b: b > 255 ? 255 : b < 0 ? 0 : Math.round(b),
    };
  }
  return color;
};

/**
 * Lightens the Color by the given amount
 * @param {object} color Color Object to work with
 * @param {number} amount Amount by which the Color should get lighten
 */
export const lighten = (color, amount) => {
  return shader(color, getBoundedChangeAmount(amount));
};

/**
 * Darkens the Color by the given amount
 * @param {object} color Color Object to work with
 * @param {number} amount Amount by which the Color should get Darken
 */
export const darken = (color, amount) => {
  return shader(color, -getBoundedChangeAmount(amount));
};

/**
 * Checks if the given color is Dark or Light
 * Help taken from https://github.com/mapbox/react-colorpickr/blob/5c7d8498c539a99c1330a83b4c7d6a79b7daaff9/src/colorfunc.js#L6
 * @param {object} color Color Object
 * @returns {boolean}
 */
export const isDark = color => {
  if (color) {
    const { r, g, b } = color;
    return !(r * 0.299 + g * 0.587 + b * 0.114 > 186);
  }
  return false;
};

/**
 * Composed Function to verify a CSS Hex String is Dark or Bright
 * @param {string} hexString CSS compatible Hex String
 * @returns {boolean}
 */
export const isDarkHex = compose(
  hexToRgb,
  isDark
);

/**
 * Lightens a color in Hex format by the given amount
 * @param {number} amount Amount by which the Hex Color should get lighten to
 * @return {string} CSS Compatible Hex String, after getting lighter
 */
export const lightenHexToAmount = amount =>
  compose(
    hexToRgb,
    rgbColor => lighten(rgbColor, amount),
    rgbToHex
  );

/**
 * Darkens a color in Hex format by the given amount
 * @param {number} amount Amount by which the Hex Color should get lighten to
 * @return {string} CSS Compatible Hex String, after getting darker
 */
export const darkenHexToAmount = amount =>
  compose(
    hexToRgb,
    rgbColor => darken(rgbColor, amount),
    rgbToHex
  );

/**
 * Converts a RGB Object / Hex String to `rgba()` string, with passed alpha, or RGBA Object to `rgba()` string with the same alpha value
 * @param {string | object} color Either a Hex String or a Color Object
 * @param {number} alpha a number between 0-1, that replaces Colors alpha channel if not present already
 * @returns {string} rgba(r, g, b, a) string
 */
export const rgba = (color, alpha = 0.5) => {
  const _rgba = isString(color) ? hexToRgb(color) : color;
  return _rgba ? `rgba(${_rgba.r}, ${_rgba.g}, ${_rgba.b}, ${_rgba.a || alpha})` : '';
};
