/*
1.3.19　给出一段代码，删除链表的尾结点，其中链表的首结点为 first。
 */

import { LinkedNode } from '../LinkedNode'

it('1.3.19', () => {
  function f(node: LinkedNode<number>) {
    let item: LinkedNode<number> = node
    for (; item.next!.next !== null; item = item.next!) {}
    console.log(item)
    item.next = item.next!.next
    return node
  }

  console.log(
    f({ value: 1, next: { value: 2, next: { value: 3, next: null } } }),
  )
  expect(
    f({ value: 1, next: { value: 2, next: { value: 3, next: null } } }),
  ).toStrictEqual({
    value: 1,
    next: { value: 2, next: null },
  } as LinkedNode<number>)
  expect(f({ value: 1, next: { value: 2, next: null } })).toStrictEqual({
    value: 1,
    next: null,
  } as LinkedNode<number>)
})
