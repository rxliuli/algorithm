import { gcd } from '../gcd'

it('测试 gcd', () => {
  expect(gcd(18, 48)).toBe(6)
  expect(gcd(2, 6)).toBe(2)
  expect(gcd(17, 9)).toBe(1)
  expect(() => gcd(-1, 0)).toThrowError()
  expect(() => gcd(1.1, 0)).toThrowError()
})
