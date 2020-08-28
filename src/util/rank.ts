/**
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
export function rank(arr: number[], n: number): number {
  function fi(min: number, max: number): number {
    if (min > max) return -1
    const mid = Math.floor(min + (max - min) / 2)
    if (arr[mid] < n) return fi(mid + 1, max)
    else if (arr[mid] > n) return fi(min, mid - 1)
    else return mid
  }

  return fi(0, arr.length - 1)
}
