/*
1.3.47　可连接的队列、栈或steque。为队列、栈或steque（请见练习 1.3.32）添加一个能够（破坏性地）连接两个同类对象的额外操作catenation。
 */

import { LinkedQueue } from '../Queue'
import { LinkedStack } from '../Stack'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

interface Connectable {
  concat(that: any): void
}

class ConnectableLinkedQueue<T> extends LinkedQueue<T> implements Connectable {
  concat(that: ConnectableLinkedQueue<T>) {
    if (this.isEmpty) {
      this.first = that.first
    } else {
      this.last!.next = that.first
    }
    this._size += that.size
  }
}

class ConnectableLinkedStack<T> extends LinkedStack<T> implements Connectable {
  concat(that: ConnectableLinkedStack<T>): void {
    if (this.isEmpty) {
      this.first = that.first
    } else {
      let i = 0
      const iterator = LinkedNodeUtil.iterator(this.first)
      for (const item of iterator) {
        if (i === this.size - 1) {
          item.next = that.first
          break
        }
        i++
      }
    }
    this._size += that.size
  }
}

describe('1.3.47', () => {
  it('测试 ConnectableLinkedQueue', () => {
    const queue1 = new ConnectableLinkedQueue()
    const queue2 = new ConnectableLinkedQueue()
    queue1.enqueue(1)
    queue1.enqueue(2)
    queue2.enqueue(3)
    queue2.enqueue(4)

    queue1.concat(queue2)
    expect([...queue1]).toEqual([1, 2, 3, 4])
  })
  it('测试 ConnectableLinkedStack', () => {
    const stack1 = new ConnectableLinkedStack()
    const stack2 = new ConnectableLinkedStack()
    stack1.push(1)
    stack1.push(2)
    stack2.push(3)
    stack2.push(4)

    stack1.concat(stack2)
    expect([...stack1]).toEqual([2, 1, 4, 3])
  })
})
