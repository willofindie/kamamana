import compose from '../compose';

it('should compose passed functions from left to right', () => {
  const add2 = val => val + 2; //number of return values should match number of arguments for next func
  const mul3 = val => val * 3;
  const pow2 = val => val * val;
  expect(
    compose(
      add2,
      mul3,
      pow2
    )(2)
  ).toBe(144);
});
