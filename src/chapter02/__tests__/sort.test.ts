import { RandomUtil } from '../../chapter01/RandomUtil'
import { uniqueBy } from '@liuli-util/array'

describe('测试排序', () => {
  function testSort(sortBy: (arr: number[]) => number[]) {
    const arr = RandomUtil.array(100)
    expect(sortBy([...arr])).toEqual([...arr].sort((a, b) => a - b))
  }

  let numberOfCompare = 0
  let numberOfExchange = 0

  beforeEach(() => {
    numberOfCompare = 0
    numberOfExchange = 0
  })

  describe('选择排序', () => {
    function sortBy(arr: number[]): number[] {
      for (let i = 0; i < arr.length - 1; i++) {
        let min = i
        for (let j = i + 1; j < arr.length; j++) {
          numberOfCompare++
          if (arr[j] < arr[min]) {
            min = j
          }
        }
        numberOfExchange++
        ;[arr[i], arr[min]] = [arr[min], arr[i]]
      }
      return arr
    }

    testSort(sortBy)
    /**
     * 对比次数: n-1+n-2+n-3+...+n-(n-1) = (n-1)^2/2
     * 交换次数: n-1
     */
    it('测试性能推断', () => {
      const num = RandomUtil.integer(10, 100)
      const arr = RandomUtil.array(num)
      sortBy(arr)
      expect(numberOfCompare).toBe((num * (num - 1)) / 2)
      expect(numberOfExchange).toBe(num - 1)
    })
  })

  describe('插入排序', () => {
    function sortBy(arr: number[]): number[] {
      for (let i = 1; i < arr.length; i++) {
        numberOfCompare++
        for (let j = i - 1; arr[j] > arr[j + 1] && j >= 0; j--) {
          numberOfCompare++
          numberOfExchange++
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
      }
      return arr
    }

    // testSort(sortBy)

    /**
     * 前提：没有重复主键的情况下
     * 一般情况
     * 交换：n(n-1)/4 ≈ n^2/4，比较：(n+4)(n-1)/4 ≈ n^2/4
     * 最坏情况
     * 交换：n(n-1)/2 ≈ n^2/2，比较：(n+2)(n-1)/2 ≈ n^2/2
     * 最好情况
     * 交换：0，比较：n-1
     */
    describe('测试性能推断', () => {
      it.skip('最好情况', () => {
        const arr = uniqueBy(RandomUtil.array(100)).sort((a, b) => a - b)
        sortBy(arr)
        expect(numberOfCompare).toBe(arr.length - 1)
        expect(numberOfExchange).toBe(0)
      })
      it('最坏情况', () => {
        const arr = uniqueBy(RandomUtil.array(100)).sort((a, b) => b - a)
        const n = arr.length
        sortBy(arr)
        expect(numberOfCompare).toBe(((n + 2) * (n - 1)) / 2)
        expect(numberOfExchange).toBe((n * (n - 1)) / 2)
      })
      it('一般情况', () => {
        const arr = RandomUtil.array(100).sort((a, b) => b - a)
        const n = arr.length
        sortBy(arr)
        console.log(numberOfExchange, (n * (n - 1)) / 4)
        console.log(numberOfCompare, ((n + 4) * (n - 1)) / 4)
      })
    })

    describe('部分有序的数组', () => {
      function computeInvertedElementPairs(arr: number[]) {
        const res: [number, number][] = []
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
              res.push([i, j])
            }
          }
        }
        return res
      }

      /**
       * 推断
       * 交换次数等于倒置元素对的数量，比较次数大于等于倒置元素对的数量，小于倒置元素对的数量加上数组大小减一。
       *
       */
      it('计算倒置元素对', () => {
        const arr = [4, 2, 1, 3]
        expect(
          computeInvertedElementPairs(arr).map(([i, j]) => [arr[i], arr[j]]),
        ).toEqual([
          [4, 2],
          [4, 1],
          [4, 3],
          [2, 1],
        ])
      })
      it('测试倒置元素对数量与插入排序的交换、排序次数的关系', () => {
        const arr = RandomUtil.array(100)
        const res = computeInvertedElementPairs(arr)
        sortBy(arr)
        expect(numberOfExchange).toBe(res.length)
        expect(numberOfCompare).toBeGreaterThanOrEqual(res.length)
        expect(numberOfCompare).toBeLessThanOrEqual(res.length + arr.length - 1)
      })
      it('使用倒置元素对来排序数组', () => {
        function sortByInvertedElementPairs(arr: number[]) {
          const invertedElementPairs = computeInvertedElementPairs(arr)
          console.log(invertedElementPairs)
          invertedElementPairs.forEach(
            ([i, j]) => ([arr[i], arr[j]] = [arr[j], arr[i]]),
          )
          return arr
        }

        console.log(sortByInvertedElementPairs([4, 2, 1, 3]))
      })
    })
  })
})
