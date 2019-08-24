import Percent from '../../modules/Percent'

test('when is 1024 it corresponds to 100%', () => {
  expect(Percent(1024)).toBe(100)
});

test('when is 512 is 50%', () => {
  expect(Percent(512)).toBe(50)
});

test('when is 0 is 100%', () => {
  expect(Percent(0)).toBe(0)
});