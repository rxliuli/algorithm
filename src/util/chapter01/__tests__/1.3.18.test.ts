/*
1.3.18　假设 x 是一条链表的某个结点且不是尾结点。下面这条语句的效果是什么？

x.next = x.next.next;
 */

interface INode<T> {
  value: T
  next?: INode<T>
}

class NodeUtil {
  static toArray<T>(node: INode<T> | undefined): T[] {
    const res: T[] = []
    for (
      let item: INode<T> | undefined = node;
      item !== undefined;
      item = item.next
    ) {
      res.push(item.value)
    }
    return res
  }
}

describe('1.3.18', () => {
  it('基本示例', () => {
    const node: INode<number> = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
        },
      },
    }

    node.next = node.next?.next
    expect(node).toStrictEqual({
      value: 1,
      next: {
        value: 3,
      },
    } as INode<number>)
  })
  it('遍历节点', () => {
    expect(
      NodeUtil.toArray({ value: 1, next: { value: 2, next: { value: 3 } } }),
    ).toStrictEqual([1, 2, 3])
    expect(NodeUtil.toArray(undefined)).toStrictEqual([])
  })
})
