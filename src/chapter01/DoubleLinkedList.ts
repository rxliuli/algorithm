import { LinkedNodeUtil } from './LinkedNodeUtil'

export interface DoubleLinkedNode<T> {
  value: T
  next: DoubleLinkedNode<T> | null
  prev: DoubleLinkedNode<T> | null
}

export interface IDoubleLinkedList<T> extends Iterable<T> {
  size: number
  isEmpty: boolean

  /**
   * 在链表尾部添加
   * @param item
   */
  push(item: T): void

  /**
   * 删除并返回链表尾部元素
   */
  pop(): T | null

  /**
   * 删除并返回链表头部元素
   */
  shift(): T | null

  /**
   * 在链表首位添加
   * @param item
   */
  unshift(item: T): void
}

export class DoubleLinkedList<T> implements IDoubleLinkedList<T> {
  protected first: DoubleLinkedNode<T> | null = null
  protected last: DoubleLinkedNode<T> | null = null
  protected _size = 0

  get size() {
    return this._size
  }

  get isEmpty() {
    return this.size === 0
  }

  [Symbol.iterator](): Iterator<T> {
    return LinkedNodeUtil.iterator(this.first, (item) => item.value)
  }

  pop(): T | null {
    if (this.size === 0) {
      return null
    }
    const old = this.last!
    this.last = old.prev
    if (this.last === null) {
      this.first = null
    } else {
      this.last.next = null
    }
    this._size--
    return old.value
  }

  push(item: T): void {
    if (this.size === 0) {
      this.first = this.last = { value: item, prev: null, next: null }
    } else {
      const old = this.last
      this.last = { value: item, prev: old, next: null }
      old!.next = this.last
    }
    this._size++
  }

  shift(): T | null {
    if (this.size === 0) {
      return null
    }
    const old = this.first!
    this.first = old.next
    if (this.first === null) {
      this.last = null
    } else {
      this.first.prev = null
    }
    this._size--
    return old.value
  }

  unshift(item: T): void {
    if (this.size === 0) {
      this.first = this.last = { value: item, prev: null, next: null }
    } else {
      const old = this.first
      this.first = { value: item, prev: null, next: old }
      old!.prev = this.first
    }
    this._size++
  }

  get(index: number): T | null {
    let i = 0
    for (const item of this) {
      if (i === index) {
        return item
      }
      i++
    }
    return null
  }

  /**
   * 在指定节点前添加新的节点
   * @param index
   * @param value
   */
  insertBefore(index: number, value: T): void {
    const iter = LinkedNodeUtil.iterator(this.first) as Generator<
      DoubleLinkedNode<T>
    >
    let i = 0
    for (const item of iter) {
      if (i === index) {
        const prev = item.prev
        const curr: DoubleLinkedNode<T> = {
          value: value,
          next: item,
          prev,
        }
        if (prev === null) {
          this.first = curr
        } else {
          prev.next = curr
        }
        item.prev = curr
        this._size++
        break
      }
      i++
    }
  }

  /**
   * 在指定节点后添加新的节点
   * @param index
   * @param value
   */
  insertAfter(index: number, value: T): void {
    const iter = LinkedNodeUtil.iterator(this.first) as Generator<
      DoubleLinkedNode<T>
    >
    let i = 0
    for (const item of iter) {
      if (i === index) {
        const next = item.next
        const curr: DoubleLinkedNode<T> = {
          value: value,
          next,
          prev: item,
        }
        if (next === null) {
          this.last = curr
        } else {
          next.prev = curr
        }
        item.next = curr
        this._size++
        break
      }
      i++
    }
  }

  /**
   * 删除指定节点
   * @param index
   */
  remove(index: number): T | null {
    const iter = LinkedNodeUtil.iterator(this.first) as Generator<
      DoubleLinkedNode<T>
    >
    let i = 0
    for (const item of iter) {
      if (i === index) {
        if (item.prev === null) {
          this.first = this.first!.next
        } else {
          item.prev.next = item.next
        }
        if (item.next === null) {
          this.last = this.last!.prev
        } else {
          item.next.prev = item.prev
        }
        this._size--
        return item.value
      }
      i++
    }
    return null
  }
}
