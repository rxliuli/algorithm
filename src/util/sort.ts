/**
 * 自行实现的排序
 * @param arr 数组
 * @param kFn kFn
 */
export function sort<T>(arr: T[], kFn: (item: T) => any): T[] {
  const res: T[] = [...arr]
  for (let i = 0; i < res.length; i++) {
    for (let j = i + 1; j < res.length; j++) {
      const temp = res[j]
      if (kFn(temp) < kFn(res[i])) {
        res[j] = res[i]
        res[i] = temp
      }
    }
  }
  return res
}
