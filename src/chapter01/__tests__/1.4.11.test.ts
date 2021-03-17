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
    const arr = this.arr
    const v = key

    function find(
      l: number,
      r: number,
    ): [index: number, left: number, right: number] | null {
      if (l > r) {
        return null
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        return [i, l, r]
      } else if (arr[i] > v) {
        return find(l, i - 1)
      } else {
        return find(i + 1, r)
      }
    }

    function findMin(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        if (l === i) {
          return i
        }
        return findMin(l, i)
      } else if (arr[i] > v) {
        return findMin(l, i - 1)
      } else {
        return findMin(i + 1, r)
      }
    }

    function findMax(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.ceil((l + r) / 2)
      if (arr[i] === v) {
        if (i === r) {
          return i
        }
        return findMax(l, i)
      } else if (arr[i] > v) {
        return findMax(l, i - 1)
      } else {
        return findMax(i + 1, r)
      }
    }

    const res = find(0, arr.length)
    if (res == null) {
      return 0
    }
    const [index, left, right] = res
    const min = findMin(left, index)
    const max = findMax(index, right)
    return max - min + 1
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
