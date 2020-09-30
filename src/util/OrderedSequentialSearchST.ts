import { ST } from './ST'

export interface KVNode<K, V> {
  key: K
  val: V
  prev: KVNode<K, V> | null
  next: KVNode<K, V> | null
}

/**
 * 有序链表实现的符号表
 * TODO 插入相同 key 时存在问题，需要修复
 */
export class OrderedSequentialSearchST<K, V> implements ST<K, V> {
  private _size = 0
  private _first: KVNode<K, V> | null = null
  put(key: K, val: V): void {
    for (let node = this._first; !!node; node = node!.next) {
      console.log('put: ', key, node.key)
      if (key === node.key) {
        node.val = val
        return
      }
      console.log('put: ', key, node.key)
      if (key < node.key) {
        const temp = node.next
        node.next = {
          key,
          val,
          prev: node,
          next: temp,
        }
        if (temp) {
          temp.prev = node.next
        }
        this._size++
        return
      }
    }
    const temp = this._first
    this._first = {
      key,
      val,
      prev: null,
      next: temp,
    }
    if (temp) {
      temp!.prev = this._first
    }
    this._size++
  }
  get(key: K) {
    for (let node = this._first; !!node && key <= node.key; node = node!.next) {
      if (node.key === key) {
        return node.val
      }
    }
    return null
  }
  delete(key: K): void {
    for (let node = this._first; !!node && key >= node.key; node = node!.next) {
      if (node.key === key) {
        if (node.prev) {
          node.prev.next = node.next
          node.next!.prev = node.prev
        } else {
          this._first = node.next
          if (node.next) {
            node.next!.prev = null
          }
        }
        this._size--
        return
      }
    }
  }
  contains(key: K): boolean {
    return this.get(key) !== null
  }
  isEmpty(): boolean {
    return this._size === 0
  }
  get size() {
    return this._size
  }

  *[Symbol.iterator]() {
    for (let node = this._first; !!node; node = node!.next) {
      yield [node.key, node.val] as [K, V]
    }
  }
}
