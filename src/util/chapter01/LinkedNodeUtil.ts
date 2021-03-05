import { LinkedNode } from './LinkedNode'

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

  /**
   * 从头开始遍历一个节点
   * @param node
   */
  static values<T>(node: LinkedNode<T> | null): T[] {
    const iter = this.iterator(node)
    const res: T[] = []
    for (let item of iter) {
      res.push(item.value)
    }
    return res
  }

  /**
   * 从头拷贝一个节点
   * @param node
   */
  static copy<T>(node: LinkedNode<T>): LinkedNode<T>
  static copy<T>(node: null): null
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

  /**
   * 反转一个节点
   * @param node
   */
  static reverse<T>(node: LinkedNode<T>): LinkedNode<T>
  static reverse<T>(node: null): null
  static reverse<T>(node: LinkedNode<T> | null): LinkedNode<T> | null {
    const iter = this.iterator(node)
    let res: LinkedNode<T> | null = null
    for (let item of iter) {
      res = { value: item.value, next: res }
    }
    return res
  }

  /**
   * 删除某个位置的节点
   * @param node
   * @param k
   */
  static splice<T>(node: LinkedNode<T>, k: number): LinkedNode<T> | null {
    const iter = LinkedNodeUtil.iterator(node)
    let i = 0
    let last: LinkedNode<T> | null = null
    for (let item of iter) {
      if (i === k) {
        if (last === null) {
          return node.next
        }
        last!.next = last!.next!.next
        break
      }
      last = item
      i++
    }
    return node
  }

  /**
   * 检查节点链条中包含符合指定表达式的第一个值
   * @param node
   * @param predicate
   */
  static find<T>(
    node: LinkedNode<T>,
    predicate: (val: T, next: LinkedNode<T> | null) => boolean,
  ): LinkedNode<T> | null {
    const iter = LinkedNodeUtil.iterator(node)
    for (let item of iter) {
      if (predicate(item.value, item.next)) {
        return item
      }
    }
    return null
  }

  /**
   * 检查节点链条中是否包含符合指定表达式的值
   * @param node
   * @param predicate
   */
  static some<T>(
    node: LinkedNode<T>,
    predicate: (val: T, next: LinkedNode<T> | null) => boolean,
  ): boolean {
    return LinkedNodeUtil.find(node, predicate) !== null
  }
}
