/*
2.1.16　验证。编写一个 check() 方法，调用 sort() 对任意数组排序。如果排序成功而且数组中的所有对象均没有被修改则返回 true，否则返回 false。不要假设 sort() 只能通过 exch() 来移动数据，可以信任并使用 Arrays.sort()。

答：
TODO 没有看懂问题，如果验证是否有序的话只要找到一个反例即可，不知道为什么要用 Arrays.sort 排序
 */

import { sortBy } from '@liuli-util/array'

it('2.1.16', () => {
  function check(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false
      }
    }
    return true
  }

  expect(check([4, 1, 2, 3])).toBeFalsy()
  expect(check(sortBy([4, 1, 2, 3]))).toBeTruthy()
  expect(check(sortBy([]))).toBeTruthy()
})
