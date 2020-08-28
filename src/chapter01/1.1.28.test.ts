/*
1.1.28 删除重复元素。修改 BinarySearch 类中的测试用例来删去排序之后白名单中的所有重复元素。
 */
/*
答案：
排序后的话可以简单的使用循环进行逐个比较删除，复杂度为 O(n)
TODO 应该有更好的解法，暂时没想到
 */
import { randIntArray } from '../util/randIntArray'

describe('1.1.28', () => {
  it('暴力解法', () => {
    function uniq(sortArr: number[]): number[] {
      for (let i = sortArr.length - 1; i >= 0; i--) {
        if (sortArr[i] === sortArr[i + 1]) {
          sortArr.splice(i + 1, 1)
        }
      }
      return sortArr
    }
    const arr = randIntArray(1000)
    arr.sort()
    console.log(uniq(arr))
  })
})
