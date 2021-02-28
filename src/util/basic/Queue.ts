export interface IQueue<T> {
  isEmpty: boolean
  size: number

  enqueue(item: T): void

  dequeue(): T | null

  [Symbol.iterator](): Generator<T>
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
}
