/*
1.3.13　假设某个用例程序会进行一系列入列和出列的混合队列操作。入列操作会将整数 0 到 9 按顺序插入队列；出列操作会打印出返回值。下面哪种序列是不可能产生的？

　　　a. 0 1 2 3 4 5 6 7 8 9

　　　b. 4 6 8 7 5 3 2 9 0 1

　　　c. 2 5 6 7 4 8 9 3 1 0

　　　d. 4 3 2 1 0 5 6 7 8 9

答：
除了顺序打印外没有其他可能，因为队列的出列顺序和插入顺序是一致的
 */

import { Queue } from '../Queue'

describe('1.3.13', () => {
  it('证明以上序列可能出现', () => {
    const queue = new Queue<number>()
    const res = []
    for (let i = 0, k = 0; i < 10; ) {
      if (k <= 9 && (Math.random() > 0.5 || queue.isEmpty)) {
        queue.enqueue(k)
        res.push(`push: ${k}`)
        k++
      } else {
        res.push(`pop: ${queue.dequeue()}`)
        i++
      }
    }
    console.log(res.filter((s) => s.includes('pop: ')))
  })
})
