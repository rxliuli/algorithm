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
})
