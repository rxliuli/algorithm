/*
2.1.27　希尔排序的用时是次平方级的。在你的计算机上用 SortCompare 比较希尔排序和插入排序以及选择排序。测试数组的大小按照 2 的幂次递增，从 128 开始。

答：
事实证明，对于随机数组，排序速度从快到慢是 希尔排序 >> 选择排序 >> 插入排序，对于一个 100k+ 元素的数组而言，大概是 希尔排序 30ms，选择排序 6s，插入排序 36s
另外：sortBy 89ms，Array#sort: 50ms
sortBy 慢是因为使用了额外的数组，但 sort 为什么慢就让人感觉很奇怪了（可能是因为更加通用？）
 */

import { RandomUtil } from '../../chapter01/RandomUtil'
import { SortUtil } from '../SortUtil'
import { sortBy } from '@liuli-util/array'
import { checkArrayEquals } from '../checkArrayEquals'

describe('2.1.27', () => {
  let arr: number[]
  beforeAll(() => {
    arr = RandomUtil.array(128 * Math.pow(2, 10))
    console.log('arr: ', arr.length)
  })
  it.skip('测试 sortOfSelection', () => {
    SortUtil.sortOfSelection([...arr])
  })
  it.skip('测试 sortOfInsert', () => {
    SortUtil.sortOfInsert([...arr])
  })
  it('测试 sortOfShell', () => {
    SortUtil.sortOfShell([...arr])
  })
  it('测试 sortBy', () => {
    sortBy([...arr])
  })
  it('测试 sortOfBinary', () => {
    SortUtil.sortOfBinary([...arr])
  })
  it('测试 sort', () => {
    ;[...arr].sort((a, b) => a - b)
  })
  it.skip('测试结果是否相同', () => {
    const res1 = SortUtil.sortOfShell([...arr])
    const res2 = sortBy([...arr])
    const res3 = [...arr].sort((a, b) => a - b)

    expect(checkArrayEquals([res1, res2, res3])).toBeTruthy()
  })
})
