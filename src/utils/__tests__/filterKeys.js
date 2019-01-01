import filterKeys from '../filterKeys';

it('should remove undefined or null keys from the argument object', () => {
  expect(filterKeys({ x: 0, y: undefined, z: null, a: '', b: 'str' })).toEqual({
    x: 0,
    a: '',
    b: 'str',
  });
});
