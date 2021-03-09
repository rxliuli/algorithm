/*
1.3.37　Josephus 问题。在这个古老的问题中，N 个身陷绝境的人一致同意通过以下方式减少生存人数。他们围坐成一圈（位置记为 0 到  N-1）并从第一个人开始报数，报到 M 的人会被杀死，直到最后一个人留下来。传说中 Josephus 找到了不会被杀死的位置。编写一个 Queue 的用例 Josephus，从命令行接受N 和M 并打印出人们被杀死的顺序（这也将显示Josephus 在圈中的位置）。

% java Josephus 7 2
1 3 5 0 4 2 6
 */

import { IQueue, LinkedQueue } from '../Queue'

describe('1.3.37', () => {
  const res = [1, 3, 5, 0, 4, 2, 6]
  it('使用数组实现', () => {
    function f(n: number, m: number): number[] {
      const arr = Array(n)
        .fill(0)
        .map((_, i) => i)
      const res: number[] = []
      const step = m % n
      let last = -1
      while (arr.length !== 0) {
        const i = last + step
        last = i < arr.length ? i : i - arr.length
        res.push(arr[last])
        arr.splice(last, 1)
        last--
      }
      return res
    }

    expect(f(7, 2)).toEqual(res)
  })
  it('使用队列实现', () => {
    /**
     * 看起来简洁了很多
     * @param n
     * @param m
     */
    function f(n: number, m: number): IQueue<number> {
      const queue = new LinkedQueue<number>()
      for (let i = 0; i < n; i++) {
        queue.enqueue(i)
      }

      const res = new LinkedQueue<number>()
      while (!queue.isEmpty) {
        for (let k = 0, step = (m % n) - 1; k < step; k++) {
          queue.enqueue(queue.dequeue()!)
        }
        res.enqueue(queue.dequeue()!)
      }

      return res
    }

    expect([...f(7, 2)]).toEqual(res)
  })
  it('使用递归公式计算', () => {
    /**
     * 这已经不能称之为简洁了，简直就是规律
     * @param n
     * @param m
     */
    function f(n: number, m: number): number {
      if (n === 0) {
        return n
      }
      return (f(n - 1, m) + m) % n
    }

    expect(f(7, 2)).toBe(6)
  })
})
