import { exch } from './exch'

/**
 * 选择排序
 * @param arr
 */
export function sortBySelect<T>(arr: T[]) {
  for (let i = 0; i < arr.length; i++) {
    //找到剩余最小的元素
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (i !== min) {
      exch(arr, i, min)
    }
  }
  return arr
}
