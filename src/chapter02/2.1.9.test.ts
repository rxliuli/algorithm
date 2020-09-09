/*
2.1.9 按照算法 2.3 所示轨迹的格式给出希尔排序是如何将数组 E A S Y S H E L L S O R T Q U E S T I O N 排序的。
 */
/*
答案：
希尔排序基本上是将数组按照某个大小分割成小数组列表，然后排序完每个小数组，然后继续将几个排序后的小数组合并为一个小数组进行排序，如此反复直到整个数组都有序。
1. 使用外层循环控制合并的次数（使用状态保存现在每个数组的大小）
2. 内层根据开始、结束、以及步长进行合并
TODO 理解了原理，但仍然无法独立写出来代码，那就说明还是没有理解
 */
import { exch } from '../util/exch'

it('2.1.9', () => {
  function f(arr: number[]) {
    let n = arr.length,
      h = 1
    while (h < Math.floor(n / 3)) {
      h = 3 * h + 1
      console.log(h)
    } // 1, 4, 13, 40, 121, 364, 1093, ...
    while (h >= 1) {
      // 将数组变为h有序
      for (let i = h; i < n; i++) {
        console.log(i)
        // 将a[i]插入到a[i-h], a[i-2*h], a[i-3*h]... 之中
        for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
          exch(arr, j, j - h)
          console.log('arr: ', j, j - h)
        }
      }
      h = Math.floor(h / 3)
      console.log(h)
    }
    return arr
  }

  console.log(f([6, 5, 4, 3, 2, 1]))
})
