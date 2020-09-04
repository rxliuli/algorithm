/*
2.1.9 按照算法 2.3 所示轨迹的格式给出希尔排序是如何将数组 E A S Y S H E L L S O R T Q U E S T I O N 排序的。
 */
/*
答案：
希尔排序基本上是将数组按照某个大小分割成小数组列表，然后排序完每个小数组，然后继续将几个排序后的小数组合并为一个小数组进行排序，如此反复直到整个数组都有序。
1. 使用外层循环控制合并的次数（使用状态保存现在每个数组的大小）
2. 内层根据开始、结束、以及步长进行合并
 */
it('2.1.9', () => {
  function merge(arr: number[], begin: number, end: number) {}

  function f(arr: number[]) {
    for (let i = 1; i < arr.length; i * 2) {
      for (let j = 0; j < Math.ceil(arr.length / i); j += i) {
        merge(arr, j * i, (j + 2) * i)
      }
    }
  }
})
