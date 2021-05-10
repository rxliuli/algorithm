/*
1.5.18　随机网格生成器。编写一个程序 RandomGrid，从命令行接受一个 int 值 N，生成一个 N*N 的网格中的所有连接。它们的排列随机且方向随机（即 (p q) 和 (q p) 出现的可能性是相等的），将这个结果打印到标准输出中。可以使用 RandomBag 将所有连接随机排列（请见练习 1.3.34），并使用如右下所示的 Connection 嵌套类来将 p 和 q 封装到一个对象中。将程序打包成两个静态方法：generate()，接受参数 N 并返回一个连接的数组；main()，从命令行接受参数 N，调用 generate()，遍历返回的数组并打印出所有连接。

private class Connection
{
   int p;
   int q;

   public Connection(int p, int q)
   {  this.p = p; this.q = q;  }
}

TODO 没看懂
 */

import { RandomUtil } from '../RandomUtil'
import { RandomBag } from './1.3.34.test'
import { IUF, UFWithWeightedQuickUnion } from '../UF'
import { Class } from 'type-fest'

type Connection = [p: number, q: number]

export class RandomGrid {
  constructor(private readonly UF: Class<IUF>) {}

  /**
   * 生成一个连接的数组
   * @param n
   */
  generate(n: number): Connection[] {
    const bag = new RandomBag<Connection>()
    const len = n * n
    // console.log(len)
    const uf = new this.UF(len)
    while (uf.count() !== 1) {
      const p = RandomUtil.integer(len)
      const q = RandomUtil.integer(len)
      if (!uf.connected(p, q)) {
        uf.union(p, q)
        bag.add([p, q])
      }
    }
    return [...bag]
  }

  /**
   * 计算在矩阵的坐标
   */
  computeMatrixIndex(index: number, n: number): [i: number, k: number] {
    const y = Math.floor(index / n)
    const x = index % n
    return [y, x]
  }

  /**
   * 生成一个已经连接好的二维数组
   * @param n
   */
  main(n: number): [number, number][][] {
    const connections = this.generate(n)
    const res = Array(n)
      .fill(0)
      .map((_, y) =>
        Array(n)
          .fill(0)
          .map((_, x) => [x, y] as [number, number]),
      )
    for (let [p, q] of connections) {
      const [pi, pk] = this.computeMatrixIndex(p, n)
      res[pi][pk] = this.computeMatrixIndex(q, n)
    }
    return res
  }
}

describe('1.5.18', () => {
  const randomGrid = new RandomGrid(UFWithWeightedQuickUnion)
  it('测试 generate', () => {
    const arr = randomGrid.generate(2)
    console.log(arr)
  })
  it('测试 main', () => {
    const res = randomGrid.main(2)
    console.log(res)
  })
})
