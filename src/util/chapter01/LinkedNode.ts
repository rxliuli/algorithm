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
}
