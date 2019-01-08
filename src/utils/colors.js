import compose from './compose';
import { isString } from '/utils/validators';
// Help taken from - https://stackoverflow.com/a/5624139/2849127

export type Color = { r: number, g: number, b: number, a?: number };

// Tests for emptiness for strings and numbers only...
// For empty object, collection, map, or set, use `lodash.isEmpty`
export const isEmptyWithoutZero = (value: any) => {
  return typeof value === 'string' || value instanceof String
    ? value.length === 0
    : value === undefined || value === null || isNaN(value);
};

/**
 * Returns and array of [r, g, b], else []
 * @param {string} rgbString RGB string of format rgb(r, g, b)
 */
export const splitRGBfromRGBString = (rgbString: string): Array<string> => {
  const result: ?Array<string> = /^rgb\(\s*?(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/i.exec(
    rgbString
  );
  return result ? result.splice(1) : [];
};

export const extractIntegerFromHexString = (hexString: ?string): Array<number> => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const _hex =
    hexString && hexString.replace(shorthandRegex, (m, r, g, b) => `#${r + r}${g + g}${b + b}`);
  const result: ?Array<string> = _hex ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex) : [];
  return result ? result.splice(1).map(val => parseInt(val, 16)) : [];
};

export const componentToHex = (c: number) => {
  if (c / 255 < 0 || c / 255 > 1) {
    return null;
  }
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Excepts a string of format `rgb(r, g, b)`
 * @param {string} rgb RGB CSS String to convert to Hex
 */
export const rgbToHex = (rgb: ?string | ?Color) => {
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

export const hexToRgb = (hex: ?string): ?Color => {
  const [r, g, b] = extractIntegerFromHexString(hex);
  return !isNaN(r) && !isNaN(g) && !isNaN(b) ? { r, g, b } : null;
};

export const getBoundedChangeAmount = (amount: number = 0) => {
  const _amount = amount < 0 ? 0 : amount > 100 ? 100 : amount;
  return (_amount / 100) * 255;
};

/**
 * This method is not the efficient way for lightening the colors.. Will understand and figure things out later
 * v0.1 :P
 * It's easiest possible way to shade colors, help taken from https://stackoverflow.com/a/13542669/2849127
 */
export const shader = (color: ?Color, amount: number): ?Color => {
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

// Wanted to use composition here, but not sure if it's possible with these functions??
export const lighten = (color: ?Color, amount: number) => {
  return shader(color, getBoundedChangeAmount(amount));
};

export const darken = (color: ?Color, amount: number) => {
  return shader(color, -getBoundedChangeAmount(amount));
};

// Help taken from https://github.com/mapbox/react-colorpickr/blob/5c7d8498c539a99c1330a83b4c7d6a79b7daaff9/src/colorfunc.js#L6
export const isDark = (color: ?Color) => {
  if (color) {
    const { r, g, b } = color;
    return !(r * 0.299 + g * 0.587 + b * 0.114 > 186);
  }
  return false;
};

export const isDarkHex = compose(
  hexToRgb,
  isDark
);

export const lightenHexToAmount = (amount: number) =>
  compose(
    hexToRgb,
    rgbColor => lighten(rgbColor, amount),
    rgbToHex
  );

export const darkenHexToAmount = (amount: number) =>
  compose(
    hexToRgb,
    rgbColor => darken(rgbColor, amount),
    rgbToHex
  );

export const rgba = (color: string | Color, alpha: number = 0.5) => {
  const _rgba = isString(color) ? hexToRgb(color) : color;
  return _rgba ? `rgba(${_rgba.r}, ${_rgba.g}, ${_rgba.b}, ${_rgba.a || alpha})` : '';
};
