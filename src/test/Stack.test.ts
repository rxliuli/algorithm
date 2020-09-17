import { UnidirectionalLinkedNode } from '../util/UnidirectionalLinkedNode'

interface IStack<T> {
  size: number

  push(v: T): void

  pop(): T | null
}

class Stack<T> implements IStack<T> {
  private _size = 0
  private _first: UnidirectionalLinkedNode<T> | null = null

  constructor(arr?: ArrayLike<T>) {
    if (!arr) {
      return
    }
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i]
      this.push(v)
    }
  }

  push(v: T) {
    this._first = {
      val: v,
      next: this._first,
    }
    this._size++
  }

  pop(): T | null {
    if (this._size === 0) {
      return null
    }
    const temp = this._first!
    this._first = temp.next!
    this._size--
    return temp!.val!
  }

  get size() {
    return this._size
  }
}

describe('测试链表', () => {
  it('基本示例', () => {
    const stack = new Stack()
    expect(stack.size).toBe(0)
    expect(stack.pop()).toBeNull()
    stack.push(1)
    stack.push(2)
    expect(stack.size).toBe(2)
    expect(stack.pop()).toBe(2)
    expect(stack.pop()).toBe(1)
    expect(stack.size).toBe(0)
  })
})
