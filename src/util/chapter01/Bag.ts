interface IBag<T> {
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
