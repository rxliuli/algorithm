import { LinkedNode, LinkedNodeUtil } from './LinkedNode'

export interface IQueue<T> extends Iterable<T> {
  isEmpty: boolean
  size: number

  enqueue(item: T): void

  dequeue(): T | null
}

export class Queue<T> implements IQueue<T> {
  private arr: T[] = []

  get isEmpty() {
    return this.arr.length === 0
  }

  get size() {
    return this.arr.length
  }

  dequeue(): T | null {
    const res = this.arr.shift()
    return res === undefined ? null : res
  }

  enqueue(item: T): void {
    this.arr.push(item)
  }

  *[Symbol.iterator]() {
    for (let t of this.arr) {
      yield t
    }
  }

  static copy<T>(queue: Queue<T>): Queue<T> {
    const res = new Queue<T>()
    for (let v of queue) {
      res.enqueue(v)
    }
    return res
  }
}

export class LinkedQueue<T> implements IQueue<T> {
  private first: LinkedNode<T> | null = null
  private last: LinkedNode<T> | null = null
  private _size = 0

  get isEmpty() {
    return this.size === 0
  }

  get size() {
    return this._size
  }

  *[Symbol.iterator](): Generator<T> {
    const iter = LinkedNodeUtil.iterator(this.first)
    for (let item of iter) {
      yield item.value
    }
  }

  dequeue(): T | null {
    if (this._size === 0) {
      return null
    }
    const res = this.first!
    this.first = res.next
    this._size--
    return res.value
  }

  enqueue(item: T): void {
    if (this._size === 0) {
      this.first = this.last = { value: item, next: null }
    } else {
      const old = this.last
      this.last = { value: item, next: null }
      old!.next = this.last
    }
    this._size++
  }
}
