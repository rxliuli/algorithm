/*
尝试递归实现二分查找
首先推算数学运算
已知有序数组 arr, 要查找 n 的下标
f(n) =>
内部函数 fi(min, max) =
  arr[min] = n, min
  arr[min] < n, fi(min+(max-min)/2, max)
  arr[min] > n, fi(min/2, min)
  min>=max, -1
TODO 该思路存在错误，修正后应该如下

二分查找
f(a, n)
内部函数 fi(min, max) =
  min>max, -1
  mid = min+(max-min)/2
  a[mid] < n, fi(mid+1, max)
  a[min] > n, fi(min, mid-1)
  a[mid] = n, mid
f(n) = fi(0, len(a)-1)
 */

import { rank } from '../util/rank'

describe('测试二分查找', () => {
  it('递归实现', () => {
    console.log(rank([1, 2, 3, 4, 5, 6], 1))
  })
  it('数组实现', () => {
    function f(arr: number[], n: number) {
      let lo = 0,
        hi = arr.length - 1
      while (lo <= hi) {
        const mid = Math.floor(lo + (hi - lo) / 2)
        console.log(hi, lo, mid)
        if (n < arr[mid]) hi = mid - 1
        else if (n > arr[mid]) lo = mid + 1
        else return mid
      }
      return -1
    }
    console.log(f([1, 2, 3, 4, 5, 6], 4))
  })
})
