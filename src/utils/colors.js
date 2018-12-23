// Help taken from - https://stackoverflow.com/a/5624139/2849127

// Tests for emptiness for strings and numbers only...
// For empty object, collection, map, or set, use `lodash.isEmpty`
export const isEmptyWithoutZero = (value: any) => {
  return typeof value === 'string' || value instanceof String
    ? value.length === 0
    : value === undefined || value === null || isNaN(value);
};

/**
 * Returns and array of [red, blue, green], else []
 * @param {string} rgbString RGB string of format rgb(red, green, blue)
 */
export const splitRGBfromRGBString = (rgbString: string): Array<string> => {
  const result: ?Array<string> = /^rgb\(\s*?(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/i.exec(
    rgbString
  );
  return result ? result.splice(1) : [];
};

export const extractIntegerFromHexString = (hexString: string): Array<number> => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const _hex = hexString.replace(shorthandRegex, (m, r, g, b) => `#${r + r}${g + g}${b + b}`);
  const result: ?Array<string> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
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
 * Excepts a string of format `rgb(red, green, blue)`
 * @param {string} rgb RGB CSS String to convert to Hex
 */
export const rgbToHex = (rgb: string) => {
  const [red, green, blue] = splitRGBfromRGBString(rgb).map(val => componentToHex(parseInt(val)));
  return red && green && blue ? `#${red}${green}${blue}` : null;
};

export const hexToRgb = (hex: string) => {
  const [red, green, blue] = extractIntegerFromHexString(hex);
  return !isNaN(red) && !isNaN(green) && !isNaN(blue) ? { red, green, blue } : null;
};

// Help taken from https://github.com/mapbox/react-colorpickr/blob/5c7d8498c539a99c1330a83b4c7d6a79b7daaff9/src/colorfunc.js#L6
export const isDark = (color: ?{ red: number, green: number, blue: number, alpha?: number }) => {
  if (color) {
    const { red, green, blue, alpha } = color;
    return !(
      red * 0.299 + green * 0.587 + blue * 0.114 > 186 ||
      (typeof alpha === 'number' ? alpha < 0.5 : false)
    );
  }
  return false;
};
