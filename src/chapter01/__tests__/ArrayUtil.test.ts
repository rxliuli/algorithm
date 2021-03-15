import { ArrayUtil } from '../ArrayUtil'
import { sortBy } from '@liuli-util/array'

describe('测试 ArrayUtil', () => {
  it('测试 shuffle', () => {
    const arr = Array(100)
      .fill(0)
      .map((_, i) => i)
    const old = [...arr]
    expect(sortBy([...ArrayUtil.shuffle(arr)])).toEqual(sortBy(old))
    expect(arr).toEqual(old)
  })
  it('测试 flat', () => {
    expect(ArrayUtil.flat([1, [2, [3, [4, [5], 6], 7], 8], 9])).toEqual([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ])
    expect(ArrayUtil.flat([])).toEqual([])
  })
})
