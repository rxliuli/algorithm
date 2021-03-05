/*
1.3.20　编写一个方法 delete()，接受一个 int 参数 k，删除链表的第 k 个元素（如果它存在的话）。
 */

import { LinkedNode, LinkedNodeUtil } from '../LinkedNode'

it('1.3.20', () => {
  const node: LinkedNode<number> = Array(5)
    .fill(0)
    .reduce(
      (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
      null,
    )

  expect(
    LinkedNodeUtil.values(LinkedNodeUtil.splice(LinkedNodeUtil.copy(node)!, 0)),
  ).toStrictEqual([2, 3, 4, 5])
  expect(
    LinkedNodeUtil.values(LinkedNodeUtil.splice(LinkedNodeUtil.copy(node)!, 1)),
  ).toStrictEqual([1, 3, 4, 5])
  expect(
    LinkedNodeUtil.values(LinkedNodeUtil.splice(LinkedNodeUtil.copy(node)!, 4)),
  ).toStrictEqual([1, 2, 3, 4])
})
