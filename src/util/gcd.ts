/*
计算两个整数的最大公约数
欧几里得算法
f(p,q) =
  c = p mod q
  c=0, q
  c>0, f(q, c)
 */
export function gcd(p: number, q: number): number {
  if (q === 0) return p
  const c = p % q
  return gcd(q, c)
}
