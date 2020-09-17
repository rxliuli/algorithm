/**
 * 单向链表的节点
 */
export interface UnidirectionalLinkedNode<T> {
  val: T
  next: UnidirectionalLinkedNode<T> | null
}
