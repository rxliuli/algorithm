/*
1.4.11　为 StaticSETofInts（请见表 1.2.15）添加一个实例方法 howMany()，找出给定键的出现次数且在最坏情况下所需的运行时间和 \log N 成正比。
 */

import { sortBy } from '@liuli-util/array'
import { BinarySearch } from '../BinarySearch'
import { RandomUtil } from '../RandomUtil'

interface IStaticSETofInts {
  /**
   * key 是否存在于集合中
   * @param key
   */
  contains(key: number): boolean

  /**
   * 找出给定键的出现次数且在最坏情况下所需的运行时间和 log N 成正比
   * @param key
   */
  howMany(key: number): number
}

class StaticSETofInts implements IStaticSETofInts {
  private readonly arr: number[]

  constructor(arr: number[]) {
    this.arr = sortBy(arr)
  }

  contains(key: number): boolean {
    return BinarySearch.searchSortArray(this.arr, key) !== -1
  }

  /**
   * 找出给定键的出现次数且在最坏情况下所需的运行时间和 log N 成正比
   * @param key
   */
  howMany(key: number): number {
    const res = BinarySearch.searchSortArrayRange(this.arr, key)
    if (res == null) {
      return 0
    }
    return res[1] - res[0] + 1
  }
}

describe('1.4.11', () => {
  it('基本示例', () => {
    const staticSETofInts = new StaticSETofInts([1, 2, 4, 4, 4, 5, 6])
    expect(staticSETofInts.howMany(4)).toBe(3)
  })
  it('随机数据测试', () => {
    const arr = RandomUtil.array(100)
    const staticSETofInts = new StaticSETofInts(arr)
    const key = arr[RandomUtil.integer(0, 100)]
    const num = staticSETofInts.howMany(key)
    expect(num).toBe(arr.filter((v) => v === key).length)
  })
})
