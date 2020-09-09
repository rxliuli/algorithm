/**
 * 交换数组两个下标的值
 * @param arr
 * @param i
 * @param k
 */
export function exch(arr: any[], i: number, k: number) {
  const temp = arr[i]
  arr[i] = arr[k]
  arr[k] = temp
}
