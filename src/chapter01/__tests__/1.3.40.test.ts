/*
1.3.40　前移编码。从标准输入读取一串字符，使用链表保存这些字符并清除重复字符。当你读取了一个从未见过的字符时，将它插入表头。当你读取了一个重复的字符时，将它从链表中删去并再次插入表头。将你的程序命名为 MoveToFront：它实现了著名的前移编码策略，这种策略假设最近访问过的元素很可能会再次访问，因此可以用于缓存、数据压缩等许多场景。
 */

import { LinkedNode } from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

interface IMoveToFront<T> extends Iterable<T> {
  write(item: T): void
}

class MoveToFront<T> implements IMoveToFront<T> {
  private first: LinkedNode<T> | null = null

  write(value: T): void {
    this.first = {
      value,
      next: LinkedNodeUtil.removeFirst(this.first, value),
    }
  }

  [Symbol.iterator](): Iterator<T> {
    return LinkedNodeUtil.iterator(this.first, (item) => item.value)
  }
}

it('1.3.40', () => {
  const moveToFront = new MoveToFront()
  moveToFront.write(1)
  moveToFront.write(2)
  moveToFront.write(3)
  moveToFront.write(2)
  moveToFront.write(2)
  expect([...moveToFront]).toEqual([2, 3, 1])
})
