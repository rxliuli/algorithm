import { UnidirectionalLinkedNode } from '../util/UnidirectionalLinkedNode'

interface IBag<T> {
  size: number

  push(val: T): void
}

class Bag<T> implements IBag<T> {
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

  get size() {
    return this._size
  }

  * [Symbol.iterator]() {
    for (let node = this._first; !!node; node = node.next) {
      yield node.val
    }
  }
}

describe('测试背包', () => {
  it('基本示例', () => {
    const bag = new Bag<number>()
    bag.push(1)
    bag.push(2)
    bag.push(3)
    expect(bag.size).toBe(3)
    expect(Array.from(bag)).toEqual([1, 2, 3])
  })
})
