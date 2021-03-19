/*
1.4.23　分数的二分查找。设计一个算法，使用对数级别的比较次数找出有理数 p/q，其中 0<p<q<N，比较形式为给定的数是否小于 x ？提示：两个分母均小于 N 的有理数之差不小于 1/N^2。
TODO 无限递归了
 */
import { Rational } from '../Rational'

it.skip('1.4.23', () => {
  function f(n: number, isLess: (that: Rational) => boolean) {
    const min = new Rational(1, n * n)

    function inner(l: Rational, r: Rational): Rational {
      const i = r.minus(l).divides(new Rational(2, 1)).plus(l)
      if (i.equals(min)) {
        return i
      }
      if (isLess(i)) {
        return inner(i, r)
      } else {
        return inner(l, i)
      }
    }

    return inner(new Rational(0, 1), new Rational(n, 1))
  }

  const res = f(10, (v) => {
    return v.compare(new Rational(1, 3)) === -1
  })
  console.log(res)
})
