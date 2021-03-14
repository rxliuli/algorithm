/**
 * 迭代器基类
 */
export interface Iterator<T> {
  [Symbol.iterator](): Generator<T>
}
