/*
1.3.14　编写一个类 ResizingArrayQueueOfStrings，使用定长数组实现队列的抽象，然后扩展实现，使用调整数组的方法突破大小的限制。
 */

import { IQueue } from '../Queue'

export class ResizingArrayQueue<T> implements IQueue<T> {
  protected arr: T[] = []
  protected _size = 0
  protected _len: number

  constructor(len: number) {
    this.arr = Array(len)
    this._len = len
  }

  get isEmpty(): boolean {
    return this._size === 0
  }

  get size(): number {
    return this._size
  }

  get len() {
    return this._len
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.arr[i]
    }
  }

  dequeue(): T | null {
    if (this._size === 0) {
      return null
    }
    const first = this.arr[0]
    this.arr = this.arr.slice(1, this._size)
    this._size--
    if (this._size <= this._len / 4) {
      this._len = Math.floor(this._len / 2)
      this.arr = this.arr.slice(0, this._len)
    }
    return first
  }

  enqueue(item: T): void {
    if (this._size >= this.len) {
      this.arr = [...this.arr, ...Array(this.len).fill(null)]
      this._len *= 2
    }
    this.arr[this._size] = item
    this._size++
  }
}

it('1.3.14', () => {
  const queue = new ResizingArrayQueue<number>(2)
  queue.enqueue(1)
  expect(queue.len).toBe(2)
  queue.enqueue(2)
  expect(queue.len).toBe(2)
  queue.enqueue(3)
  expect(queue.len).toBe(4)
  expect([...queue]).toEqual([1, 2, 3])
  expect(queue.dequeue()).toBe(1)
  expect(queue.dequeue()).toBe(2)
  expect(queue.len).toBe(2)
  expect(queue.dequeue()).toBe(3)
  expect(queue.len).toBe(1)
})
