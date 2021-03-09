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
})
