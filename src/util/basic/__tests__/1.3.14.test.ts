/*
1.3.14　编写一个类 ResizingArrayQueueOfStrings，使用定长数组实现队列的抽象，然后扩展实现，使用调整数组的方法突破大小的限制。
 */

import { IQueue } from '../Queue'

it('1.3.14', () => {
  class ResizingArrayQueue<T> implements IQueue<T> {
    private arr: T[] = []
    private _size = 0
    private _len: number

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
      throw new Error('no imp')
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
})
