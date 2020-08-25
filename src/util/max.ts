/**
 * 找到二维数组中最长的子数组
 * @param arr
 */
export function max(arr: number[]) {
  let max = 0
  for (let elem of arr) {
    if (max < elem) {
      max = elem
    }
  }
  return max
}
