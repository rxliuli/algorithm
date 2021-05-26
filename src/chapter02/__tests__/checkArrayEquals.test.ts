import { checkArrayEquals } from '../checkArrayEquals'

it('测试 checkArrayEquals', () => {
  expect(
    checkArrayEquals([
      [1, 2, 3],
      [1, 2, 3],
    ]),
  ).toBeTruthy()
  expect(
    checkArrayEquals([
      [1, 2, 3],
      [1, 4, 3],
    ]),
  ).toBeFalsy()
  expect(
    checkArrayEquals([
      [1, 2, 3],
      [1, 3],
    ]),
  ).toBeFalsy()
})
