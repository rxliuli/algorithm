/*
2.1.34　罕见情况。编写一个测试用例，调用 sort() 方法对实际应用中可能出现困难或极端情况的数组进行排序。比如，数组可能已经是有序的，或是逆序的，数组的所有主键相同，数组的主键只有两种值，大小为 0 或是 1 的数组。
 */

import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'
import { SortUtil } from '../SortUtil'

describe('2.1.34', () => {
  const num = Math.pow(2, 12)
  const arr = RandomUtil.array(num)
  const ascArr = sortBy(arr)
  const descArr = sortBy(arr, (i) => -i)
  const oneKeyArr = Array(num).fill(0)
  const twoKeyArr = RandomUtil.array(num, () => RandomUtil.integer(2))
  describe('sortBy', () => {
    testSort(sortBy)
  })

  function testSort(sort: (arr: number[]) => number[]) {
    it('有序', () => {
      sort([...ascArr])
    })
    it('逆序', () => {
      sort([...descArr])
    })
    it('主键相同', () => {
      sort([...oneKeyArr])
    })
    it('主键只有两种值', () => {
      sort([...twoKeyArr])
    })
  }

  describe('binary', () => {
    testSort(SortUtil.sortOfBinary)
  })
  describe('shell', () => {
    testSort(SortUtil.sortOfShell)
  })
  describe('insert', () => {
    testSort(SortUtil.sortOfInsert)
  })
  describe('selection', () => {
    testSort(SortUtil.sortOfSelection)
  })
})
