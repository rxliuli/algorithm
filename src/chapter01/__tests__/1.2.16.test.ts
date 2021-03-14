/*
1.2.16　有理数。为有理数实现一个不可变数据类型 Rational，支持加减乘除操作。

public class Rational
              Rational(int numerator, int denominator)
   Rational   plus(Rational b)	该数与  之和
   Rational   minus(Rational b)	该数与  之差
   Rational   times(Rational b)	该数与  之积
   Rational   divides(Rational b)	该数与  之商
    boolean   equals(Rational that)	该数与 that 相等吗
     String   toString()	对象的字符串表示
　　　无需测试溢出（请见练习 1.2.17），只需使用两个 long 型实例变量表示分子和分母来控制溢出的可能性。使用欧几里得算法来保证分子和分母没有公因子。编写一个测试用例检测你实现的所有方法。
 */

import { Rational } from '../Rational'

it('1.2.16', () => {
  const a = new Rational(1, 2)
  const b = new Rational(2, 3)
  expect(a.plus(b)).toStrictEqual(new Rational(7, 6))
  expect(a.minus(b)).toStrictEqual(new Rational(-1, 6))
  expect(a.times(b)).toStrictEqual(new Rational(1, 3))
  expect(a.divides(b)).toStrictEqual(new Rational(3, 4))

  expect(a.numerator).toBe(1)
  expect(a.denominator).toBe(2)
  expect(a.toString()).toBe('1/2')
})
