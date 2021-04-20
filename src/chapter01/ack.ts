/**
 * 阿克曼函数
 * @link https://zh.wikipedia.org/wiki/%E9%98%BF%E5%85%8B%E6%9B%BC%E5%87%BD%E6%95%B8
 */
export function ack(m: number, n: number): number {
  if (m === 0) {
    return n + 1
  }
  if (n === 0) {
    return ack(m - 1, 1)
  }
  return ack(m - 1, ack(m, n - 1))
}
