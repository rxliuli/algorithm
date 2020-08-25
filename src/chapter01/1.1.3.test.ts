/*
1.1.3 编写一个程序，从命令行得到三个整数参数。如果它们都相等则打印 equal，否则打印 not
equal。
 */

function foo(args: [number, number, number]) {
  return args[0] === args[1] && args[1] === args[2]
}

it('1.1.3', () => {
  expect(foo([1, 1, 1])).toBeTruthy()
  expect(foo([1, 2, 3])).toBeFalsy()
})

export {}
