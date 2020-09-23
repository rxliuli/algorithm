type DArray<T extends any[]> = T extends (infer U)[] ? U : never

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
export function rank<T>(arr: T[], key: T): number
export function rank<T extends any[], K>(
  arr: T,
  key: K,
  kFn: (val: DArray<T>) => K,
): number
export function rank<T, K>(
  arr: T[],
  key: K,
  kFn: (val: T) => K = (val) => (val as any) as K,
): number {
  function fi(min: number, max: number): number {
    if (min > max) return -1
    const mid = Math.floor(min + (max - min) / 2)
    if (kFn(arr[mid]) < key) return fi(mid + 1, max)
    else if (kFn(arr[mid]) > key) return fi(min, mid - 1)
    else return mid
  }

  return fi(0, arr.length - 1)
}
