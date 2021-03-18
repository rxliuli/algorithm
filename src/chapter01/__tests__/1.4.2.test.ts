/*
1.4.2　修改 ThreeSum，正确处理两个较大的 int 值相加可能溢出的情况。
 */

import { BinarySearch } from '../BinarySearch'
import { sortBy, uniqueBy } from '@liuli-util/array'
import { RandomUtil } from '../RandomUtil'

/**
 * 测试 twoSum 函数
 * @param f
 */
export function testTwoSum(
  f: (arr: number[], sum: number) => [number, number][],
) {
  //基本示例
  expect(f([0, 1, 3, 4, 6, 7, 10, 11], 10)).toEqualSort([
    [0, 6],
    [2, 5],
    [3, 4],
  ])

  //测试有多个重复的值
  expect(f([0, 1, 3, 3, 4, 6, 7, 7, 10, 11], 10)).toEqualSort([
    [0, 8],
    [2, 7],
    [2, 6],
    [3, 7],
    [3, 6],
    [4, 5],
  ])

  //测试随机生成的数据
  const len = 10_000
  const arr = sortBy(
    uniqueBy(
      Array(len)
        .fill(0)
        .map(() => RandomUtil.integer(0, len)),
    ),
  )
  const sum = 5000
  const res = f(arr, sum)
  expect(res.every(([i, k]) => arr[i] + arr[k] === sum)).toBeTruthy()
  expect(res.length).toBe(twoSumOld(arr, sum).length)
}

function twoSumOld(arr: number[], sum: number): [number, number][] {
  const res: [number, number][] = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === sum) {
        res.push([i, j])
      }
    }
  }
  return res
}

function twoSumByRank(arr: number[], sum: number): [number, number][] {
  const res: [number, number][] = []
  for (let i = 0, len = arr.length; i < len; i++) {
    const v = arr[i]
    const k = BinarySearch.searchSortArrayRange(arr, sum - v, i + 1, len - 1)
    if (k !== null) {
      const [l, r] = k
      for (let j = l; j <= r; j++) {
        res.push([i, j])
      }
    }
  }
  return res
}

describe('1.4.2', () => {
  it('使用双重循环', () => {})
  it('二分搜索', () => {
    testTwoSum(twoSumByRank)
  })
})
