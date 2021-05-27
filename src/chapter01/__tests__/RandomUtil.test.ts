import { RandomUtil } from '../RandomUtil'
import { repeatedCall } from '@liuli-util/test'

describe('测试 RandomUtil', () => {
  it('测试 integer', () => {
    repeatedCall(() => expect(RandomUtil.integer(10)).toBeLessThan(10), 100)
    repeatedCall(() => {
      const val = RandomUtil.integer(5, 10)
      expect(val).toBeGreaterThanOrEqual(5)
      expect(val).toBeLessThan(10)
    }, 100)
    expect(() => RandomUtil.integer(1.5)).toThrowError()
    repeatedCall(() => {
      const val = RandomUtil.integer(-10, 0)
      expect(val).toBeGreaterThanOrEqual(-10)
      expect(val).toBeLessThan(0)
    }, 100)
  })
  it('测试 builder', () => {
    const builder = RandomUtil.builder([
      [2, 0],
      [1, 1],
      [1, 2],
    ])
    const arr = RandomUtil.array(1000, builder)
    expect(arr.every((i) => i >= 0 && i <= 2)).toBeTruthy()
    const len0 = arr.filter((i) => i === 0).length
    const len1 = arr.filter((i) => i === 1).length
    const len2 = arr.filter((i) => i === 2).length
    expect(len0).toBeGreaterThan(len1)
    expect(len0).toBeGreaterThan(len2)
  })
})
