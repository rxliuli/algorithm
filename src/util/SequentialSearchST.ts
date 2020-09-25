import { ST } from './ST'

interface KVNode<K, V> {
  key: K
  val: V
  next: KVNode<K, V> | null
}

export class SequentialSearchST<K, V> implements ST<K, V> {
  protected first: KVNode<K, V> | null = null
  protected _size = 0
  /**
   * 插入是常数时间的操作
   * 由于插入到头部，会导致遍历顺序是插入顺序的倒序
   * @param key
   * @param val
   */
  put(key: K, val: V): void {
    this.delete(key)
    const first: KVNode<K, V> = {
      key,
      val,
      next: this.first,
    }
    this.first = first
    this._size++
  }
  /**
   * 获取是线性时间
   * @param key
   */
  get(key: K): V | null {
    for (const [k, v] of this) {
      if (key === k) {
        if (v === null) {
          this.delete(key)
          return null
        }
        return v
      }
    }
    return null
  }
  /**
   * 删除是线性时间
   * @param key
   */
  delete(key: K): void {
    if (this._size === 0) {
      return
    }
    let prev: KVNode<K, V> | null = null
    for (let node of this.iterator()) {
      if (node.key === key) {
        if (prev === null) {
          this.first = node.next
        } else {
          prev!.next = node.next
        }
        node.next = null
        this._size--
        return
      }
      prev = node
    }
  }
  /**
   * 基于 {@method get} 方法
   * @param key
   */
  contains(key: K): boolean {
    return this.get(key) !== null
  }
  isEmpty(): boolean {
    return this._size === 0
  }
  get size(): number {
    return this._size
  }
  protected *iterator() {
    for (let node = this.first; !!node; node = node.next) {
      yield node
    }
  }
  *[Symbol.iterator]() {
    for (let node of this.iterator()) {
      yield [node.key, node.val] as [K, V]
    }
  }
}
