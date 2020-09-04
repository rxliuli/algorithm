/*
2.1.6 在所有的主键都相同时，选择排序和插入排序谁更快？
 */
/*
答案：
插入排序更快，因为插入排序是将当前值与之前已经排序好的部分进行对比，所以只要对比一次就能确定位置，即 On 次就可以
而选择排序则必须对比完所有后续的值找到最小的（未排序），才能将之插入到当前位置
 */
import { rand } from '../util/rand'
import { testPerformance } from '../util/testPerformance'
import { sortByInsert } from '../util/sortByInsert'
import { sortBySelect } from '../util/sortBySelect'

describe('2.1.6', () => {
  it('所有主键都相同的数组', () => {
    testPerformance(sortByInsert, sortBySelect, Array(100).fill(100))
  })
  it('主键顺序的数组', () => {
    const arr = Array(100).fill(rand(100))
    arr.sort()
    testPerformance(sortByInsert, sortBySelect, arr)
  })
})
