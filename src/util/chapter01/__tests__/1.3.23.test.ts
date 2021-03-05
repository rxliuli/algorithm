/*
1.3.23　为什么下面这段代码和上一道题中的代码效果不同？

x.next = t;
t.next = x.next;
 */

import { LinkedNode } from '../LinkedNode'

it('1.3.23', () => {
  //递归数据结构，这是相当危险的
  const node: LinkedNode<number> = { value: 1, next: null }
  node.next = node
  expect(() => JSON.stringify(node)).toThrowError()
})
