/*
2.1.24　插入排序的哨兵。在插入排序的实现中先找出最小的元素并将其置于数组的最左边，这样就能去掉内循环的判断条件 j>0。使用 SortCompare 来评估这种做法的效果。注意：这是一种常见的规避边界测试的方法，能够省略判断条件的元素通常被称为哨兵。

答：减小了内圈的一次判断，但感觉没什么影响
 */

import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'
import { sortOfInsert } from './2.1.4.test'

interface SortCompare {
  less(arr: any[], i: number, k: number): boolean

  exchange(arr: any[], i: number, k: number): void
}

class SortCompareImpl implements SortCompare {
  less = jest.fn((arr: any[], i: number, k: number): boolean => arr[i] < arr[k])
  exchange = jest.fn(
    (arr: any[], i: number, k: number) => ([arr[i], arr[k]] = [arr[k], arr[i]]),
  )
}

it('2.1.24', () => {
  function sortOfInsertEnhance(arr: number[], { less, exchange }: SortCompare) {
    function findMin(arr: number[]) {
      let min = 0
      for (let i = 1; i < arr.length; i++) {
        if (less(arr, i, min)) {
          min = i
        }
      }
      return min
    }

    const min = findMin(arr)
    exchange(arr, 0, min)
    for (let i = 2; i < arr.length; i++) {
      for (let j = i - 1; less(arr, j + 1, j); j--) {
        exchange(arr, j, j + 1)
      }
    }

    return arr
  }

  const arr = RandomUtil.array(10)
  const sortCompare = new SortCompareImpl()
  expect(sortOfInsertEnhance([...arr], sortCompare)).toEqual(sortBy(arr))
  console.log(sortCompare.less.mock.calls.length)
  console.log(sortCompare.exchange.mock.calls.length)

  console.log(sortOfInsert([...arr])[1].length)
})
