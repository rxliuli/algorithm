/*
1.3.29　用环形链表实现Queue。环形链表也是一条链表，只是没有任何结点的链接为空，且只要链表非空则 last.next 的值为 first。只能使用一个 Node 类型的实例变量（last）。
 */

import { IQueue } from '../Queue'
import { LinkedNode } from '../LinkedNode'
import { testQueue } from './Queue.test'

class LoopLinkedQueue<T> implements IQueue<T> {
  private last: LinkedNode<T> | null = null
  private _size = 0

  get isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this._size
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let item = this.last!.next; item; item = item.next) {
      yield item.value
      if (item === this.last) {
        break
      }
    }
  }

  //TODO 感觉这里的实现有优化空间
  dequeue(): T | null {
    if (this._size === 0) {
      return null
    }
    const res = this.last!.next!
    if (this._size === 1) {
      this.last = null
    } else {
      this.last!.next = res.next
    }
    this._size--
    return res.value
  }

  //TODO 感觉这里的实现有优化空间
  enqueue(item: T): void {
    if (this._size === 0) {
      this.last = { value: item, next: null }
      this.last.next = this.last
    } else {
      this.last!.next = {
        value: item,
        next: this.last!.next,
      }
      this.last = this.last!.next
    }
    this._size++
  }
}

it('1.3.29', () => {
  testQueue(LoopLinkedQueue)
})
