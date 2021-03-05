/*
1.3.30　编写一个函数，接受一条链表的首结点作为参数，（破坏性地）将链表反转并返回结果链表的首结点。

　　　迭代方式的解答：为了完成这个任务，我们需要记录链表中三个连续的结点：reverse、first 和 second。在每轮迭代中，我们从原链表中提取结点 first 并将它插入到逆链表的开头。我们需要一直保持 first 指向原链表中所有剩余结点的首结点，second 指向原链表中所有剩余结点的第二个结点，reverse 指向结果链表中的首结点。

public Node reverse(Node x)
{
   Node first   = x;
   Node reverse = null;
   while (first != null)
   {
      Node second = first.next;
      first.next  = reverse;
      reverse     = first;
      first       = second;
   }
   return reverse;
}
　　　在编写和链表相关的代码时，我们必须小心处理异常情况（链表为空或是只有一个或两个结点）和边界情况（处理首尾结点）。它们通常比处理正常情况要困难得多。

　　　递归解答：假设链表含有 N 个结点，我们先递归颠倒最后 N-1 个结点，然后小心地将原链表中的首结点插入到结果链表的末端。

public Node reverse(Node first)
{
   if (first == null) return null;
   if (first.next == null) return first;
   Node second = first.next;
   Node rest = reverse(second);
   second.next = first;
   first.next  = null;
   return rest;
}
 */
import { LinkedNode } from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

describe('1.3.30', () => {
  function testReverse(f: <T>(node: LinkedNode<T>) => LinkedNode<T>) {
    const node: LinkedNode<number> = Array(5)
      .fill(0)
      .reduce(
        (res, _, i) => ({ value: 5 - i, next: res } as LinkedNode<number>),
        null,
      )

    expect(LinkedNodeUtil.values(f(node))).toStrictEqual([5, 4, 3, 2, 1])
    expect(LinkedNodeUtil.values(f({ value: 1, next: null }))).toStrictEqual([
      1,
    ])
  }

  it('迭代实现', () => {
    function f1<T>(node: LinkedNode<T>): LinkedNode<T> {
      let prev: LinkedNode<T> | null = null
      for (let item: LinkedNode<T> | null = node; item !== null; ) {
        const next: LinkedNode<T> | null = item.next
        item.next = prev
        prev = item
        item = next
      }
      return prev!
    }

    testReverse(f1)
  })
  it('递归实现（尾递归）', () => {
    function f2<T>(node: LinkedNode<T>): LinkedNode<T> {
      function f(
        prev: LinkedNode<T> | null,
        item: LinkedNode<T> | null,
      ): LinkedNode<T> | null {
        if (item === null) {
          return prev
        }
        const next = item.next
        item.next = prev
        //尾递归，使用的仍然是循环思想
        return f(item, next)
      }

      return f(null, node)!
    }

    testReverse(f2)
  })
  it('递归实现（处理 N-1 然后收敛）', () => {
    function f3<T>(node: LinkedNode<T>): LinkedNode<T> {
      if (node === null) {
        return null!
      }
      if (node.next === null) {
        return node
      }
      const next = node.next
      const res = f3(next)
      next.next = node
      //这一句看的比较懵
      //这里将指向下一个的引用消除，至于怎么指向前一个，只要等到函数返回收敛到上一个节点 next.next = node 将之反转为这个节点
      node.next = null
      return res
    }

    testReverse(f3)
  })
})
