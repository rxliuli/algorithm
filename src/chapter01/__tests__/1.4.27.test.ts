/*
1.4.27　两个栈实现的队列。用两个栈实现一个队列，使得每个队列操作所需的堆栈操作均摊后为一个常数。提示：如果将所有元素压入栈再弹出，它们的顺序就被颠倒了。如果再次重复这个过程，它们的顺序则会复原。
 */

import { IQueue } from '../Queue'
import { LinkedStack, StackUtil } from '../Stack'
import { testQueue } from './Queue.test'

describe('1.4.27', () => {
  class QueueWidthTwoStack<T> implements IQueue<T> {
    protected s1 = new LinkedStack<T>()
    protected s2 = new LinkedStack<T>()
    private _size = 0

    get isEmpty(): boolean {
      return this.size === 0
    }

    get size(): number {
      return this._size
    }

    *[Symbol.iterator](): Iterator<T> {
      const arr = [...this.s1]
      for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i]
      }
    }

    dequeue(): T | null {
      if (this._size === 0) {
        return null
      }
      this._size--
      for (let t of this.s1) {
        this.s2.push(t)
      }
      StackUtil.clear(this.s1)
      const res = this.s2.pop()
      for (let t of this.s2) {
        this.s1.push(t)
      }
      StackUtil.clear(this.s2)
      return res
    }

    enqueue(item: T): void {
      this.s1.push(item)
      this._size++
    }
  }

  it('线性级别的实现', () => {
    testQueue(QueueWidthTwoStack)
  })
  it('均摊常数级别的实现', () => {
    class QueueWidthTwoStackForConstant<T> implements IQueue<T> {
      protected s1 = new LinkedStack<T>()
      protected s2 = new LinkedStack<T>()

      get isEmpty(): boolean {
        return this.size === 0
      }

      get size(): number {
        return this.s1.size + this.s2.size
      }

      *[Symbol.iterator](): Iterator<T> {
        for (let t of this.s2) {
          yield t
        }
        for (let arr = [...this.s1], i = arr.length - 1; i >= 0; i--) {
          yield arr[i]
        }
      }

      enqueue(item: T): void {
        this.s1.push(item)
      }

      dequeue(): T | null {
        if (this.isEmpty) {
          return null
        }
        //需要时将 stack 转移
        if (this.s2.isEmpty) {
          while (this.s1.size > 0) {
            this.s2.push(this.s1.pop()!)
          }
        }
        return this.s2.pop()
      }
    }

    testQueue(QueueWidthTwoStackForConstant)
  })
})
