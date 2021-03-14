/*
1.3.24　编写一个方法 removeAfter()，接受一个链表结点作为参数并删除该结点的后续结点（如果参数结点或参数结点的后续结点为空则什么也不做）。
 */

import { LinkedNodeUtil } from '../LinkedNodeUtil'
import { LinkedNode } from '../LinkedNode'

it('1.3.24', () => {
  expect(
    LinkedNodeUtil.removeAfter({ value: 1, next: { value: 2, next: null } }),
  ).toStrictEqual({
    value: 1,
    next: null,
  } as LinkedNode<number>)
  expect(LinkedNodeUtil.removeAfter({ value: 1, next: null })).toStrictEqual({
    value: 1,
    next: null,
  } as LinkedNode<number>)
})
