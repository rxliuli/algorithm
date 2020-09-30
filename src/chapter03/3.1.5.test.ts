/*
3.1.5　实现 SequentialSearchST 中的 size()、delete() 和 keys() 方法。
*/
/*
答案
已实现
*/

import { SequentialSearchST } from '../util/SequentialSearchST'

it('3.1.5', () => {
  const st = new SequentialSearchST<number, number>()
  expect(st.size).toBe(0)
  st.put(1, 1)
  expect(st.size).toBe(1)
  expect(Array.from(st)).toEqual([[1, 1]])
  st.delete(1)
})
