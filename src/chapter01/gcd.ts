/**
 * 计算最大公约数
 * @param a
 * @param b
 */
export function gcd(a: number, b: number): number {
  function f(a: number, b: number): number {
    if (b === 0) {
      return a
    }
    return f(b, a % b)
  }

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('两个数字必须均为整数')
  }
  if (a < 0 || b < 0) {
    throw new Error('两个数字必须均不能小于 0')
  }
  return f(a, b)
}
