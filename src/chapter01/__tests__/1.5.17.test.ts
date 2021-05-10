/*
1.5.17　随机连接。设计 UF 的一个用例 ErdosRenyi，从命令行接受一个整数 N，在 0 到 N-1 之间产生随机整数对，调用 connected() 判断它们是否相连，如果不是则调用union() 方法（和我们的开发用例一样）。不断循环直到所有触点均相互连通并打印出生成的连接总数。将你的程序打包成一个接受参数N 并返回连接总数的静态方法count()，添加一个main() 方法从命令行接受N，调用 count() 并打印它的返回值。

 */

import { UFWithWeightedQuickUnion } from '../UF'
import { RandomUtil } from '../RandomUtil'

export function erdosRenyi(n: number): [number, number][] {
  const uf = new UFWithWeightedQuickUnion(n)
  const res: [number, number][] = []
  while (uf.count() !== 1) {
    const p = RandomUtil.integer(n)
    const q = RandomUtil.integer(n)
    uf.union(p, q)
    res.push([p, q])
  }
  return res
}

it('1.5.17', () => {
  console.log(erdosRenyi(10).length)
})
