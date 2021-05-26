/*
2.1.15　昂贵的交换。一家货运公司的一位职员得到了一项任务，需要将若干大货箱按照发货时间摆放。比较发货时间很容易（对照标签即可），但将两个货箱交换位置则很困难（移动麻烦）。仓库已经快满了，只有一个空闲的仓位。这位职员应该使用哪种排序算法呢？

答：选择排序，因为交换的次数是恒定的，交换次数最大为 n-1 次（但似乎可以按照插值排序法，即算出每个位置应该放哪个，然后依次将空位填充），是的，最坏情况下能够保证移动次数为 1.5n 次，相比于选择排序的 (n-1)*3 仍然要好得多
 */

import { sortOfSelection } from './2.1.1.test'
import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'
import { RequireAtLeastOne } from 'type-fest'

describe('2.1.15', () => {
  const arr = RandomUtil.array(10)
  it('使用选择排序', () => {
    const [, locus] = sortOfSelection(arr)
    const exchangeCount = locus.filter(([i, min]) => i !== min).length
    expect(exchangeCount).toBeLessThan(arr.length)
    console.log(exchangeCount * 3)
  })
  type Action = RequireAtLeastOne<{
    from: number
    to: number
  }>

  /**
   * 根据预先计算进行排序，尽可能减少元素移动次数
   * 示意图：https://photos.google.com/photo/AF1QipMXcn4S8xx0HgK4FzeweEGZxVNmm9L_LFz_anJA
   * @param arr
   */
  function sortOfPreCalculated(
    arr: number[],
  ): { arr: number[]; locus: Action[] } {
    const locus: Action[] = []
    const sortedIndexSet = new Set<number>()

    function findIndexByRange(
      arr: number[],
      v: number,
      left: number,
      right: number,
    ) {
      for (let i = left; i < right; i++) {
        if (arr[i] === v && !sortedIndexSet.has(i)) {
          return i
        }
      }
      return -1
    }

    const sortArr = sortBy(arr)
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === sortArr[i]) {
        continue
      }
      let temp: number | null = arr[i]
      locus.push({
        from: i,
      })
      let vacancyIndex = i
      while (temp !== null) {
        const v = sortArr[vacancyIndex]
        if (v === temp) {
          arr[vacancyIndex] = temp
          sortedIndexSet.add(vacancyIndex)
          locus.push({ to: vacancyIndex })
          temp = null
          break
        }
        const findIndex = findIndexByRange(arr, v, i + 1, arr.length)
        arr[vacancyIndex] = arr[findIndex]
        sortedIndexSet.add(vacancyIndex)
        locus.push({ from: findIndex, to: vacancyIndex })
        vacancyIndex = findIndex
      }
    }
    return { arr, locus }
  }

  it('使用预先计算然后插值', () => {
    /**
     * 根据动作列表排序
     * @param arr
     * @param locus
     */
    function sortByLocus(arr: number[], locus: Action[]) {
      let temp: number | null = null
      locus.forEach(({ from, to }) => {
        if (from === undefined) {
          arr[to!] = temp!
          return
        }
        if (to === undefined) {
          temp = arr[from]
          return
        }
        arr[to] = arr[from]
      })
      return arr
    }

    const res = sortOfPreCalculated([...arr])
    expect(res.arr).toEqual(sortBy(arr))

    expect(sortByLocus([...arr], res.locus)).toEqual(sortBy(arr))
  })

  it('对比选择排序与预先计算值的元素移动次数', () => {
    const arr = RandomUtil.array(100)
    const selectionLocusCount = sortOfSelection([...arr])[1].length * 3
    const preCalculatedCount = sortOfPreCalculated([...arr]).locus.length
    expect(preCalculatedCount).toBeLessThanOrEqual(selectionLocusCount)
  })
  describe('构造针对预先计算值的极端情况', () => {
    /**
     * 生成最坏情况的输入数组
     * 1. 没有重复
     * 2. 以倒序对的形式
     * 3. 个数是偶数个（避免最后一个元素不需要交换）
     * @param len
     */
    function genWorstCase(len: number) {
      if (len <= 0 || len % 2 !== 0) {
        throw new Error('非法参数')
      }
      const res = RandomUtil.array(len, (i) => i)
      for (let i = 0; i < res.length; i += 2) {
        ;[res[i], res[i + 1]] = [res[i + 1], res[i]]
      }
      return res
    }

    it('测试 genWorstCase', () => {
      const len = Math.floor(RandomUtil.integer(100) / 2) * 2
      expect(sortOfPreCalculated(genWorstCase(len)).locus.length).toBe(
        len * 1.5,
      )
    })

    /**
     * 生成最好情况的输入数组
     * 有序数组
     * @param len
     */
    function genBestCase(len: number) {
      return sortBy(RandomUtil.array(len))
    }

    it('测试 genBestCase', () => {
      expect(
        sortOfPreCalculated(genBestCase(RandomUtil.integer(100))).locus.length,
      ).toBe(0)
    })

    it('对比针对预先计算值的最坏情况与选择排序', () => {
      const arr = genWorstCase(Math.floor(RandomUtil.integer(100) / 2) * 2)
      const selectionLocusCount = sortOfSelection([...arr])[1].length * 3
      const preCalculatedCount = sortOfPreCalculated([...arr]).locus.length
      console.log(arr.length, selectionLocusCount, preCalculatedCount)
    })
  })
})
