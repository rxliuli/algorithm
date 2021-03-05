/*
1.3.22　假设 x 是一条链表中的某个结点，下面这段代码做了什么？

t.next = x.next;
x.next = t;
 */

import { LinkedNode } from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

it('1.3.22', () => {
  const x: LinkedNode<number> = {
    value: 1,
    next: { value: 3, next: null },
  }
  const t: LinkedNode<number> = { value: 2, next: null }
  t.next = x.next
  x.next = t
  expect(LinkedNodeUtil.values(x)).toStrictEqual([1, 2, 3])
})
