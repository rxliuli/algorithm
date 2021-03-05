/*
1.3.25　编写一个方法insertAfter()，接受两个链表结点作为参数，将第二个结点插入链表并使之成为第一个结点的后续结点（如果两个参数为空则什么也不做）。
 */

import { LinkedNodeUtil } from '../LinkedNodeUtil'

it('1.3.25', () => {
  const a = { value: 1, next: { value: 3, next: null } }
  const b = { value: 2, next: null }
  LinkedNodeUtil.insertAfter(a, b)
  expect(LinkedNodeUtil.values(a)).toStrictEqual([1, 2, 3])
})
