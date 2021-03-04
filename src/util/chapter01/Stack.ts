import { LinkedNode, LinkedNodeUtil } from './LinkedNode'

export interface IStack<T> extends Iterable<T> {
  isEmpty: boolean
  size: number

  push(item: T): void

  pop(): T | null
}

export class Stack<T> implements IStack<T> {
  private arr: T[] = []

  get isEmpty() {
    return this.arr.length === 0
  }

  get size() {
    return this.arr.length
  }

  pop(): T | null {
    const res = this.arr.pop()
    return res === undefined ? null : res
  }

  peek(): T | null {
    const res = this.arr[this.arr.length - 1]
    return res === undefined ? null : res
  }

  push(item: T): void {
    this.arr.push(item)
  }

  *[Symbol.iterator]() {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      yield this.arr[i]
    }
  }

  static copy<T>(stack: Stack<T>): Stack<T> {
    const arr = [...stack]
    const res = new Stack<T>()
    for (let i = arr.length - 1; i >= 0; i--) {
      res.push(arr[i])
    }
    return res
  }
}

export class LinkedStack<T> implements IStack<T> {
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

  pop(): T | null {
    if (this._size === 0) {
      return null
    }
    const res = this.first!
    this.first = res.next
    this._size--
    return res.value
  }

  push(item: T): void {
    this.first = {
      value: item,
      next: this.first,
    }
    this._size++
  }
}
