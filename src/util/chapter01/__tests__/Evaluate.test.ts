import { evaluate } from '../Evaluate'

it('测试 Evaluate', () => {
  expect(evaluate('((1 + 2) * 3)')).toBe(9)
  expect(evaluate('1 + 2')).not.toBe(3)
  expect(() => evaluate('(1 + 2))')).toThrowError()
})
