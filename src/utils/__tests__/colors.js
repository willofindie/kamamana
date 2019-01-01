import * as colors from '../colors';

it('should check for emptiness of a value, excluding 0', () => {
  const { isEmptyWithoutZero } = colors;
  expect(isEmptyWithoutZero(0)).toBeFalsy();
  expect(isEmptyWithoutZero(undefined)).toBeTruthy();
  expect(isEmptyWithoutZero(null)).toBeTruthy();
  expect(isEmptyWithoutZero(NaN)).toBeTruthy();
  expect(isEmptyWithoutZero('ab')).toBeFalsy();
});

describe('get rgb values from an rgb string', () => {
  const { splitRGBfromRGBString } = colors;
  it('should pass for proper strings', () => {
    expect(splitRGBfromRGBString('rgb(12, 125, 2)')).toEqual(['12', '125', '2']);
    expect(splitRGBfromRGBString('rgb( 12, 125, 2 )')).toEqual(['12', '125', '2']);
    expect(splitRGBfromRGBString('rgb(12,125,2)')).toEqual(['12', '125', '2']);
  });

  it('should return [] for improper strings', () => {
    expect(splitRGBfromRGBString('(12, 125, 2)')).toEqual([]);
    expect(splitRGBfromRGBString('rgb(1223, 125, 2)')).toEqual([]);
    expect(splitRGBfromRGBString('rgba(12, 125, 2)')).toEqual([]);
    expect(splitRGBfromRGBString('rgb(12, 125)')).toEqual([]);
    expect(splitRGBfromRGBString('rgb(12, fa, 12)')).toEqual([]);
  });
});

describe('get hex values from a hex string', () => {
  const { extractIntegerFromHexString } = colors;
  it('should pass for proper string', () => {
    expect(extractIntegerFromHexString('#0a1f3b')).toEqual([10, 31, 59]);
    expect(extractIntegerFromHexString('#0f3')).toEqual([0, 255, 51]);
  });

  it('should return [] for improper strings', () => {
    expect(extractIntegerFromHexString('#11xs23')).toEqual([]);
    expect(extractIntegerFromHexString('#1xd')).toEqual([]);
    expect(extractIntegerFromHexString('#10df')).toEqual([]);
    expect(extractIntegerFromHexString('#fafafa01')).toEqual([]);
  });
});

describe('get proper length string from hex value', () => {
  const { componentToHex } = colors;
  it('should pass for integer in range 0 - 255', () => {
    expect(componentToHex(123)).toEqual('7b');
    expect(componentToHex(0)).toEqual('00');
  });

  it('should return null for integer not in range 0 - 255', () => {
    expect(componentToHex(-1)).toBeNull();
    expect(componentToHex(257)).toBeNull();
  });
});

it('should properly return a value between [0 - 255]', () => {
  const { getBoundedChangeAmount } = colors;
  expect(getBoundedChangeAmount(30)).toBe(76.5);
  expect(getBoundedChangeAmount(-1)).toBe(0);
  expect(getBoundedChangeAmount(200)).toBe(255);
});

it('should add the passed amount to each part of the COLOR, COLOR stays in range [0 - 255] always', () => {
  const { shader } = colors;
  const color = { r: 24, g: 12, b: 250 };
  expect(shader(color, 12)).toEqual({
    r: 36,
    g: 24,
    b: 255,
  });
  expect(shader(color, -14)).toEqual({
    r: 10,
    g: 0,
    b: 236,
  });
});

describe('converts RGB to Hex String', () => {
  const { rgbToHex } = colors;
  it('should pass for valid string', () => {
    expect(rgbToHex('rgb(242, 242, 171)')).toEqual('#f2f2ab');
  });

  it('should pass for valid Color Object', () => {
    expect(rgbToHex({ r: 242, g: 242, b: 171 })).toEqual('#f2f2ab');
  });

  it('should fail and return null', () => {
    expect(rgbToHex('rgb(242, 242, 257)')).toBeNull();
  });
});

describe('converts HEX to RGB Object', () => {
  const { hexToRgb } = colors;
  it('should pass for valid input', () => {
    expect(hexToRgb('#f2f2ab')).toEqual({
      r: 242,
      g: 242,
      b: 171,
    });
  });

  it('should fail and return null', () => {
    expect(hexToRgb('#fefefe01')).toBeNull();
  });
});

describe('tests for color to be dark', () => {
  const { isDark } = colors;
  it('should pass for valid input', () => {
    expect(
      isDark({
        r: 242,
        g: 242,
        b: 171,
      })
    ).toBeFalsy();
  });
});

describe('tests for color to be dark', () => {
  const { isDarkHex } = colors;
  it('should pass for valid input', () => {
    expect(isDarkHex('#333')).toBeTruthy();
  });
});

it('should lighten the color', () => {
  const { lighten } = colors;
  const color = { r: 12, g: 24, b: 250 }; // hex format: '#0c18fa'
  expect(lighten(color, 10)).toEqual({ r: 38, g: 50, b: 255 });
});

it('should darken the color', () => {
  const { darken } = colors;
  const color = { r: 12, g: 24, b: 250 }; // hex format: '#0c18fa'
  expect(darken(color, 24)).toEqual({ r: 0, g: 0, b: 189 });
});

it('should darken the color, from hex format and return a hex formatted color string', () => {
  const { lightenHexToAmount } = colors;
  const color = '#0c18fa';
  const lightenHexBy10 = lightenHexToAmount(10);
  expect(lightenHexBy10(color)).toEqual('#2632ff');
});

it('should darken the color, from hex format and return a hex formatted color string', () => {
  const { darkenHexToAmount } = colors;
  const color = '#0c18fa';
  const darkenHexBy24 = darkenHexToAmount(24);
  expect(darkenHexBy24(color)).toEqual('#0000bd');
});
