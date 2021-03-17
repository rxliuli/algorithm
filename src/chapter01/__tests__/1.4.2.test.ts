/*
1.4.2　修改 ThreeSum，正确处理两个较大的 int 值相加可能溢出的情况。
 */

import { BinarySearch } from '../BinarySearch'
import { RandomUtil } from '../RandomUtil'
import { uniqueBy } from '@liuli-util/array'

function twoSum(arr: number[], sum: number): [number, number][] {
  const res: [number, number][] = []
  arr.sort()
  for (let i = 0, len = arr.length; i < len; i++) {
    const v = arr[i]
    const k = BinarySearch.searchSortArray(arr, sum - v, i, len)
    if (k !== -1) {
      res.push([i, k])
    }
  }
  return res
}

it('1.4.2', () => {
  const len = 10_000
  const arr = uniqueBy(
    Array(len)
      .fill(0)
      .map(() => RandomUtil.integer(0, len)),
  )
  const sum = 5000
  expect(
    twoSum(arr, sum).every(([i, k]) => arr[i] + arr[k] === sum),
  ).toBeTruthy()
})
