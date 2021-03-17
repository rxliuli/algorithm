/**
 * 比较器
 */
export interface OrderItemComparator<T> {
  /**
   * 比较确定有序列表中的元素的查找
   * @param value
   * @return 如果等于 0 则认为相等，如果小于 0 则认为 小于，否则认为是 大于
   */
  (value: T): number
}
