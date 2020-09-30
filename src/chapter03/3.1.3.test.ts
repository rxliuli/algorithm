/*
3.1.3　开发一个符号表的实现 OrderedSequentialSearchST，使用有序链表来实现我们的有序符号表 API。
*/
/*
答案
尝试使用双向链表来处理它，发现似乎更加简单（主要是找到上一个节点）
*/

import { OrderedSequentialSearchST } from '../util/OrderedSequentialSearchST'

describe('3.1.3', () => {
  it.skip('基本示例', () => {
    const st = new OrderedSequentialSearchST<number, number>()
    st.put(3, 3)
    st.put(1, 1)
    st.put(2, 2)
    // 必然是有序的
    expect(Array.from(st)).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
    ])
  })
  it.skip('测试插入删除', () => {
    const st = new OrderedSequentialSearchST<number, number>()
    st.put(3, 3)
    st.put(1, 1)
    st.put(2, 2)
    st.delete(1)
    expect(st.size).toBe(2)
    st.delete(2)
    st.delete(3)
    expect(st.size).toBe(0)
  })
  it('测试插入重复键', () => {
    const st = new OrderedSequentialSearchST<number, number>()
    st.put(1, 1)
    st.put(1, 1)
    st.put(2, 2)
    st.put(2, 2)
  })
})
