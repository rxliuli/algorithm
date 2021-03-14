import { LinkedNodeUtil } from '../LinkedNodeUtil'
import { LinkedNode } from '../LinkedNode'

it('1.3.26', () => {
  const node: LinkedNode<number> = Array(5)
    .fill(0)
    .reduce(
      (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
      null,
    )
  expect(
    LinkedNodeUtil.values(LinkedNodeUtil.filter(node, (i) => i % 2 === 0)),
  ).toStrictEqual([2, 4])
})
