import { UnidirectionalLinkedNode } from '../util/UnidirectionalLinkedNode'

interface IQueue<T> {
  size: number

  push(v: T): void

  shift(): T | null
}

class Queue<T> implements IQueue<T> {
  private _size = 0
  private _first: UnidirectionalLinkedNode<T> | null = null
  private _last: UnidirectionalLinkedNode<T> | null = null

  push(val: T): void {
    const last = {
      val,
      next: null,
    }
    if (this._size === 0) {
      this._first = this._last = last
      this._size++
      return
    }
    this._last!.next = last
    this._last = last
    this._size++
  }

  shift(): T | null {
    if (this._size === 0) {
      return null
    }
    const temp = this._first
    this._first = temp!.next
    this._size--
    return temp!.val
  }

  get size() {
    return this._size
  }
}

describe('测试队列', () => {
  it('基本示例', () => {
    const queue = new Queue<number>()
    expect(queue.size).toBe(0)
    expect(queue.shift()).toBeNull()
    queue.push(1)
    queue.push(2)
    expect(queue.size).toBe(2)
    expect(queue.shift()).toBe(1)
    expect(queue.shift()).toBe(2)
    expect(queue.size).toBe(0)
  })
})
