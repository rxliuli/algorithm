/**
 * 单向链表的节点
 */
export interface LinkedNode<T> {
  value: T
  next: LinkedNode<T> | null
}

