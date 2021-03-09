import { LinkedNode } from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

describe('测试 LinkedNode', () => {
  describe('测试 LinkedNodeUtil', () => {
    const node: LinkedNode<number> = Array(3)
      .fill(0)
      .reduce(
        (res, _, i) => ({ value: 3 - i, next: res } as LinkedNode<number>),
        null,
      )
    it('测试 iterator', () => {
      expect(
        [...LinkedNodeUtil.iterator(node)].map((item) => item.value),
      ).toStrictEqual([1, 2, 3])
    })
    it('测试 values', () => {
      expect(LinkedNodeUtil.values(node)).toStrictEqual([1, 2, 3])
      expect(LinkedNodeUtil.values(null)).toStrictEqual([])
    })
    it('测试 copy', () => {
      expect(LinkedNodeUtil.copy(node)).not.toBe(node)
      expect(LinkedNodeUtil.copy(node)).toStrictEqual(node)
      expect(LinkedNodeUtil.copy(null)).toBeNull()
    })
    it('测试 reverse', () => {
      expect(
        LinkedNodeUtil.values(LinkedNodeUtil.reverse(node)),
      ).toStrictEqual([3, 2, 1])
      expect(LinkedNodeUtil.reverse(null)).toBeNull()
    })
  })
})
