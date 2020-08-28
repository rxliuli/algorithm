import { rand } from './rand'

/**
 * 生成一个整数数组
 * @param num
 * @param min
 * @param max
 */
export function randIntArray(
  num: number,
  min: number = 0,
  max: number = 1000,
): number[] {
  return Array(num)
    .fill(0)
    .map(() => rand(max))
}
