/*
1.3.27　编写一个方法max()，接受一条链表的首结点作为参数，返回链表中键最大的节点的值。假设所有键均为正整数，如果链表为空则返回 0。
 */

import { LinkedNodeUtil } from '../LinkedNodeUtil'
import { LinkedNode } from '../LinkedNode'

it('1.3.27', () => {
  const f = (a: LinkedNode<number>, b: LinkedNode<number>) => a.value - b.value
  expect(LinkedNodeUtil.max(null, f)).toBeNull()
  const node: LinkedNode<number> = Array(5)
    .fill(0)
    .reduce(
      (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
      null,
    )
  expect(LinkedNodeUtil.max(node, f)).toBe(5)
})
