/*
2.1.3 构造一个含有 N 个元素的数组，使选择排序（算法 2.1）运行过程中 a[j] < a[min])（由此 min
会不断更新）成功的次数最大。
 */
/*
答案：倒序数组
 */

import { each } from '../util/each'
import { randIntArray } from '../util/randIntArray'
import { sort } from '../util/sort'

it('2.1.3', () => {
  function f<T>(arr: T[]) {
    const map = new Map<any, number>()
    for (let i = 0; i < arr.length; i++) {
      //找到剩余最小的元素
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
          map.set(i, (map.get(i) || 0) + 1)
        }
      }
      if (i !== min) {
        each(arr, i, min)
      }
    }
    return [arr, map] as const
  }

  const arr = randIntArray(100, 0, 1000)
  const sortArr = sort(arr, (i) => -i)

  function compute(map: Map<any, number>): number {
    return [...map.values()].reduce((res, v) => res + v, 0)
  }

  //倒序的比较次数一定大于等于默认的
  expect(compute(f(sortArr)[1])).toBeGreaterThanOrEqual(compute(f(arr)[1]))
})
