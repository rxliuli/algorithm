/*
1.3.21　编写一个方法 find()，接受一条链表和一个字符串 key 作为参数。如果链表中的某个结点的 item 域的值为 key，则方法返回 true，否则返回 false。
 */

import { LinkedNode} from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

it('1.3.21', () => {
  const node: LinkedNode<number> = Array(5)
    .fill(0)
    .reduce(
      (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
      null,
    )
  expect(LinkedNodeUtil.some(node, (i) => i === 4)).toBeTruthy()
  expect(LinkedNodeUtil.some(node, (i) => i === 0)).toBeFalsy()
})
