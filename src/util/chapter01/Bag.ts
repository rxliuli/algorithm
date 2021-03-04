import { LinkedNode, LinkedNodeUtil } from './LinkedNode'

export interface IBag<T> extends Iterable<T> {
  isEmpty: boolean
  size: number

  add(item: T): void
}

export class Bag<T> implements IBag<T> {
  private arr: T[] = []

  get isEmpty() {
    return this.arr.length === 0
  }

  get size() {
    return this.arr.length
  }

  add(item: T): void {
    this.arr.push(item)
  }

  *[Symbol.iterator]() {
    for (let t of this.arr) {
      yield t
    }
  }
}

export class LinkedBag<T> implements IBag<T> {
  private first: LinkedNode<T> | null = null
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

  add(item: T): void {
    this.first = {
      value: item,
      next: this.first,
    }
    this._size++
  }
}
