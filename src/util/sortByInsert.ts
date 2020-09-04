import { each } from './each'

/**
 * 插入排序
 * @param arr
 */
export function sortByInsert(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    //如果小于上一个值，则交换它们
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      //直到不小于上一个值为止
      each(arr, j, j - 1)
    }
  }
  return arr
}
