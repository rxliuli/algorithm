/*
2.1.4 按照算法 2.2 所示轨迹的格式给出插入排序是如何将数组 E A S Y Q U E S T I O N 排序的。
 */
/*
答案：
实现一个插入排序，然后打印出轨迹即可
 */
import { each } from '../util/each'
import { SortProcessInfo } from '../model/SortProcessInfo'

it('2.1.4', () => {
  const res: SortProcessInfo[] = []

  function f(arr: (number | string)[]) {
    for (let i = 1; i < arr.length; i++) {
      //如果小于上一个值，则交换它们
      for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
        res.push({ arr, i: j, j: j - 1 })
        //直到不小于上一个值为止
        each(arr, j, j - 1)
      }
    }
    return arr
  }

  expect(f([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  console.log(res.length)
  res.length = 0
  console.log(f(['E', 'A', 'S', 'Y', 'Q', 'U', 'E', 'S', 'T', 'I', 'O', 'N']))
  console.log(res)
})
