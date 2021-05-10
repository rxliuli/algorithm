/*
1.5.23　在 Erdös-Renyi 模型下比较 quick-find 算法和 quick-union 算法。开发一个性能测试用例，从命令行接受一个 int 值 T 并进行 T 次以下实验：使用练习 1.5.17 的用例生成随机连接。保存这些连接并和我们的开发用例一样分别用 quick-find 算法和 quick-union 算法检查触点的连通性，不断循环直到所有触点均相互连通。对于每个N，打印出 N 值和两种算法的运行时间的比值。

TODO 大致上 quick-find/quick-union 的运行时间比是 1~2 之间，平均值是 1.5
 */

import { RandomUtil } from '../RandomUtil'
import { erdosRenyi } from './1.5.17.test'
import { UFWithQuickFind, UFWithQuickUnion } from '../UF'
import { markdownTable } from '@liuli-util/markdown-table'
import { countTime } from '@liuli-util/test'

it('1.5.23', () => {
  const res = RandomUtil.array(20, (i) => (i + 1) * 100).map((len) => {
    const quickFindTime = countTime(
      () => erdosRenyi(len, UFWithQuickFind).length,
    )
    const quickUnionTime = countTime(
      () => erdosRenyi(len, UFWithQuickUnion).length,
    )
    return [len, quickUnionTime === 0 ? 1 : quickFindTime / quickUnionTime] as [
      number,
      number,
    ]
  })

  console.log('平均值: ', res.reduce((res, v) => res + v[1], 0) / res.length)
  console.log(markdownTable([['len', 'scale'], ...res]))
})
