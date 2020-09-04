/*
2.1.7 对于逆序数组，选择排序和插入排序谁更快？
 */
/*
答案：
对于逆序数组，插入排序和选择排序在比较时都需要对比所有的值（不管是前面排好序还是后面未排好序的部分），而交换的次数却不一样，选择排序每次内循环仅会交换一次，整体只交换 n 次，而插入排序会交换 1+2+3+...+n-1=n(n-1)/2 次
TODO 实际结果并不是，可能是吾辈的猜测错误或实现有问题
 */
import { rand } from '../util/rand'
import { sortByInsert } from '../util/sortByInsert'
import { sortBySelect } from '../util/sortBySelect'
import { testPerformance } from '../util/testPerformance'

it.skip('2.1.7', () => {
  const arr = Array(100)
    .fill(0)
    .map(() => rand(100))
    .sort((a, b) => b - a)
  testPerformance(sortBySelect, sortByInsert, arr)
})
