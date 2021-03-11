/*
1.3.48　双向队列与栈。用一个双向队列实现两个栈，保证每个栈操作只需要常数次的双向队列操作（请见练习 1.3.33）。
 */

import { IStack } from '../Stack'
import { DoubleLinkedList, DoubleLinkedNode } from '../DoubleLinkedList'

class InnerDoubleLinkedList<T> extends DoubleLinkedList<T> {
  getFirst(): DoubleLinkedNode<T> | null {
    return this.first
  }

  getLast(): DoubleLinkedNode<T> | null {
    return this.last
  }
}

class TwoStack<T> {
  private list = new InnerDoubleLinkedList<T>()
  private leftSize = 0
  private rightSize = 0

  push(item: T): void {
    this.rightSize++
    return this.list.push(item)
  }

  pop(): T | null {
    if (this.rightSize === 0) {
      return null
    }
    this.rightSize--
    return this.list.pop()
  }

  unshift(item: T): void {
    this.leftSize++
    return this.list.unshift(item)
  }

  shift(): T | null {
    if (this.leftSize === 0) {
      return null
    }
    this.leftSize--
    return this.list.shift()
  }

  get(): [IStack<T>, IStack<T>] {
    const _this = this
    return [
      {
        get size() {
          return _this.leftSize
        },
        get isEmpty() {
          return _this.rightSize === 0
        },
        pop(): T | null {
          return _this.shift()
        },
        push(item: T) {
          _this.unshift(item)
        },
        *[Symbol.iterator](): Iterator<T> {
          for (
            let i = 0, last = _this.list.getFirst();
            i < _this.leftSize;
            i++, last = last!.next
          ) {
            yield last!.value
          }
        },
      },
      {
        get size() {
          return _this.rightSize
        },
        get isEmpty() {
          return _this.rightSize === 0
        },
        pop(): T | null {
          return _this.pop()
        },
        push(item: T) {
          _this.push(item)
        },
        *[Symbol.iterator](): Iterator<T> {
          for (
            let i = 0, last = _this.list.getLast();
            i < _this.rightSize;
            i++, last = last!.prev
          ) {
            yield last!.value
          }
        },
      },
    ]
  }
}

it('1.3.48', () => {
  function testStack(stack: IStack<number>) {
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect([...stack]).toEqual([3, 2, 1])
    expect(stack.size).toBe(3)
    expect(stack.pop()).toBe(3)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.pop()).toBeNull()
    expect(stack.isEmpty).toBeTruthy()
  }

  const [stack1, stack2] = new TwoStack<number>().get()
  testStack(stack1)
  testStack(stack2)
})
