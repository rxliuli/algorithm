/*
2.1.1 按照算法 2.1 所示轨迹的格式给出选择排序是如何将数组 E A S Y Q U E S T I O N 排序的。
 */
/*
答案：首先，要编写出选择排序的函数
 */

import { exch } from '../util/exch'
import { SortProcessInfo } from '../model/SortProcessInfo'

it('2.1.1', () => {
  const res: SortProcessInfo[] = []

  function f<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
      //找到剩余最小的元素
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }
      res.push({ arr: [...arr], i, j: min })
      if (i !== min) {
        exch(arr, i, min)
      }
    }
    return arr
  }
  expect(
    f(['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']),
  ).toEqual(['A', 'E', 'E', 'I', 'N', 'O', 'Q', 'S', 'S', 'T', 'U', 'Y'])
  console.log(res)
})
