/*
2.2.4　是否当且仅当两个输入的子数组都有序时原地归并的抽象方法才能得到正确的结果？证明你的结论，或者给出一个反例。

答：
是的，只要有一个子数组不是有序的，那么最终得到的结果便是错误的。例如 merge([3, 4, 2, 1], 0, 3, 1, Array(4)) 得到结果 [ 2, 1, 3, 4 ]
 */

import { merge } from './sort.test'

it('2.2.4', () => {
  const res = merge([3, 4, 2, 1], 0, 3, 1, Array(4))
  console.log(res)
  expect(res).not.toEqual([1, 2, 3, 4])
})
