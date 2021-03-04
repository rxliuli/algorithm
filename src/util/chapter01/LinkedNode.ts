/**
 * 单向链表的节点
 */
export interface LinkedNode<T> {
  value: T
  next: LinkedNode<T> | null
}

/**
 * 单向链表的一些工具类
 */
export class LinkedNodeUtil {
  /**
   * 迭代单向链表
   * @param node
   */
  static *iterator<T>(node: LinkedNode<T> | null): Generator<LinkedNode<T>> {
    for (
      let item: LinkedNode<T> | null = node;
      item !== null;
      item = item.next
    ) {
      yield item
    }
  }

  static values<T>(node: LinkedNode<T> | null): T[] {
    const iter = this.iterator(node)
    const res: T[] = []
    for (let item of iter) {
      res.push(item.value)
    }
    return res
  }

  static copy<T>(node: LinkedNode<T> | null): LinkedNode<T> | null {
    const iter = this.iterator(node)
    const first: LinkedNode<T> = { value: null as any, next: null }
    let curr = first
    for (let item of iter) {
      const temp: LinkedNode<T> = { value: item.value, next: null }
      curr!.next = temp
      curr = temp
    }
    return first.next
  }

  static reverse<T>(node: LinkedNode<T> | null): LinkedNode<T> | null {
    const iter = this.iterator(node)
    let res: LinkedNode<T> | null = null
    for (let item of iter) {
      item.next = { value: item.value, next: res }
      res = item
    }
    return res
  }
}
