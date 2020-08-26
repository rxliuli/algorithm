/*
1.1.22 使用 1.1.6.4 节中的 rank() 递归方法重新实现 BinarySearch 并跟踪该方法的调用。每当该方法
被调用时，打印出它的参数 lo 和 hi 并按照递归的深度缩进。提示：为递归方法添加一个参数
来保存递归的深度。
 */
/*
答案：
添加参数指代当前递归的深度，默认应该为 0
 */
it('1.1.22', () => {
  function f(arr: number[], n: number): number {
    function fi(min: number, max: number, dp: number): number {
      if (min > max) return -1
      console.log(min, max, dp)
      const mid = Math.floor(min + (max - min) / 2)
      if (arr[mid] < n) return fi(mid + 1, max, dp + 1)
      else if (arr[mid] > n) return fi(min, mid - 1, dp + 1)
      else return mid
    }
    return fi(0, arr.length - 1, 0)
  }

  const arr = Array(100)
    .fill(0)
    .map((_, i) => i)
  console.log(f(arr, 99))
})
