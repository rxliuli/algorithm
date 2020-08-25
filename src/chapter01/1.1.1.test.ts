/*
1.1.1 给出以下表达式的值：
a. ( 0 + 15 ) / 2
b. 2.0e-6 * 100000000.1
c. true && false || true && true
 */

/*
答案
a. 7.5
b.
c. true
 */

it('1.1.1', () => {
  // noinspection PointlessArithmeticExpressionJS
  console.log((0 + 15) / 2)
  console.log(2.0e-6 * 100000000.1)
  // noinspection PointlessBooleanExpressionJS
  console.log((true && false) || (true && true))
})
