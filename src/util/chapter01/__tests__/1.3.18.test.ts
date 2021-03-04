/*
1.3.18　假设 x 是一条链表的某个结点且不是尾结点。下面这条语句的效果是什么？

x.next = x.next.next;
 */

import { LinkedNode, LinkedNodeUtil } from '../LinkedNode'

describe('1.3.18', () => {
  it('基本示例', () => {
    const node: LinkedNode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null,
        },
      },
    }

    node.next = node.next!.next
    expect(node).toStrictEqual({
      value: 1,
      next: {
        value: 3,
        next: null,
      },
    } as LinkedNode<number>)
  })
  it('遍历节点', () => {
    expect(
      LinkedNodeUtil.values({
        value: 1,
        next: { value: 2, next: { value: 3, next: null } },
      }),
    ).toStrictEqual([1, 2, 3])
    expect(LinkedNodeUtil.values(null)).toStrictEqual([])
  })
})
