/*
1.1.5 编写一段程序，如果 double 类型的变量 x 和 y 都严格位于 0 和 1 之间则打印 true，否则打印
false。
 */

it('1.1.5', () => {
  function foo(x: number, y: number) {
    function betweenZeroAndOne(num: number) {
      return num >= 0 && num < 1
    }
    return betweenZeroAndOne(x) && betweenZeroAndOne(y)
  }

  expect(foo(0.1, 0.4)).toBeTruthy()
  expect(foo(0.1, 5)).toBeFalsy()
  expect(foo(3, 5)).toBeFalsy()
})
