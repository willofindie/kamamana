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

describe('converts RGB to Hex String', () => {
  const { rgbToHex } = colors;
  it('should pass for valid input', () => {
    expect(rgbToHex('rgb(242, 242, 171)')).toEqual('#f2f2ab');
  });

  it('should fail and return null', () => {
    expect(rgbToHex('rgb(242, 242, 257)')).toBeNull();
  });
});

describe('converts HEX to RGB Object', () => {
  const { hexToRgb } = colors;
  it('should pass for valid input', () => {
    expect(hexToRgb('#f2f2ab')).toEqual({
      red: 242,
      green: 242,
      blue: 171,
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
        red: 242,
        green: 242,
        blue: 171,
      })
    ).toBeFalsy();
  });
});
