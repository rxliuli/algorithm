/*
1.3.27　编写一个方法max()，接受一条链表的首结点作为参数，返回链表中键最大的节点的值。假设所有键均为正整数，如果链表为空则返回 0。
 */

import { LinkedNodeUtil } from '../LinkedNodeUtil'
import { LinkedNode } from '../LinkedNode'

it('1.3.27', () => {
  function testMax(
    max: <T, N extends LinkedNode<T> | null>(
      node: N,
      predicate: (a: LinkedNode<T>, b: LinkedNode<T>) => number,
    ) => N,
  ) {
    const f = (a: LinkedNode<number>, b: LinkedNode<number>) =>
      a.value - b.value
    expect(max(null, f)).toBeNull()
    const node: LinkedNode<number> = Array(5)
      .fill(0)
      .reduce(
        (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
        null,
      )
    expect(max(node, f)).toBe(5)
  }

  /**
   * 使用递归调用
   * @param node
   * @param predicate
   */
  function max<T>(
    node: LinkedNode<T>,
    predicate: (a: LinkedNode<T>, b: LinkedNode<T>) => number,
  ): T
  function max<T>(
    node: null,
    predicate: (a: LinkedNode<T>, b: LinkedNode<T>) => number,
  ): null
  function max<T>(
    node: LinkedNode<T> | null,
    predicate: (a: LinkedNode<T>, b: LinkedNode<T>) => number,
  ): T | null {
    if (node === null) {
      return null
    }
    let max = node

    function f(item: LinkedNode<T> | null): LinkedNode<T> {
      if (item === null) {
        return max
      }
      if (predicate(max, item) < 0) {
        max = item
      }
      return f(item.next)
    }

    return f(node.next).value
  }

  testMax(LinkedNodeUtil.max)
  testMax(max)
})
