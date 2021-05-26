/*
2.1.21　可比较的交易。用我们的 Date 类（请见 2.1.1.4 节）作模板扩展你的 Transaction 类（请见练习 1.2.13），实现 Comparable 接口，使交易能够按照金额排序。

答：
前端的一般做法是用高阶函数的形式而非实现接口，因为前端的对象不是从自定义类中派生的，而更类似于一种结构体
 */

import { SmartDate } from '../../chapter01/__tests__/1.3.16.test'
import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'

/**
 * 交易
 */
class Transaction {
  constructor(
    readonly who: string,
    readonly when: SmartDate,
    readonly amount: number,
  ) {}
}

it('2.1.21', () => {
  const transactions = RandomUtil.array(
    10,
    () =>
      new Transaction(
        'rxliuli',
        new SmartDate(2021, 1, 1),
        RandomUtil.integer(100),
      ),
  )
  console.log(sortBy(transactions, (item) => item.amount))
})
