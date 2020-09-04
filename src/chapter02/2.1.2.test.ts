/*
2.1.2 在选择排序中，一个元素最多可能会被交换多少次？平均可能会被交换多少次？
 */
/*
答案：
为什么交换？因为当前值小于后续的最小值，所以需要交换，所以最坏情况下会被交换 n-1 次
平均的话不太清楚。。。
 */

import { each } from '../util/each'

it('2.1.2', () => {
  function f<T>(arr: T[]) {
    const map = new Map<any, number>()
    for (let i = 0; i < arr.length; i++) {
      //找到剩余最小的元素
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }
      if (i !== min) {
        map.set(arr[i], (map.get(arr[i]) || 0) + 1)
        map.set(arr[min], (map.get(arr[min]) || 0) + 1)
        each(arr, i, min)
      }
    }
    return [arr, map] as const
  }
  //最多 4 次
  console.log(f([5, 1, 2, 3, 4]))
})
