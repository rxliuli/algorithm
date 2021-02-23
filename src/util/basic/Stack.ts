interface IStack<T> {
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

  push(item: T): void {
    this.arr.push(item)
  }

  *[Symbol.iterator]() {
    for (let t of this.arr) {
      yield t
    }
  }
}
