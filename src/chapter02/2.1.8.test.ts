/*
2.1.8 假设元素只可能有三种值，使用插入排序处理这样一个随机数组的运行时间是线性的还是平方级
别的？或是介于两者之间？
 */
/*
答案：
线性级别，因为插入排序内循环中每次最多往前前移 2 位即可完成插入，所以是线性的
TODO 看到实际运行结果后发现结论是错的，因为即便只有 3 种值，但数组整体上是逆序的时候仍然是会变成 a + b,b+1,...,c-1 + c,c+1,...,n
 */

import { each } from '../util/each'
import { rand } from '../util/rand'

describe('2.1.8', () => {
  const res: [number, number][][] = []

  function f(arr: number[]) {
    for (let i = 1; i < arr.length; i++) {
      res.push([])
      //如果小于上一个值，则交换它们
      for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
        res[res.length - 1].push([arr[j], arr[j - 1]])
        //直到不小于上一个值为止
        each(arr, j, j - 1)
      }
    }
    return arr
  }

  afterEach(() => {
    res.length = 0
  })
  it('基本示例', () => {
    expect(f([2, 2, 2, 1, 1, 1, 0, 0, 0])).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2])
    console.log(res)
  })
  it('实际测试', () => {
    const arr = Array(1000)
      .fill(0)
      .map(() => rand(3))
    expect(res.flat().length).toBeLessThanOrEqual(arr.length * arr.length)
  })
})
