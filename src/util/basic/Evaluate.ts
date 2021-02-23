import { Stack } from './Stack'

/**
 * 计算简单的数学加减乘除表达式
 * 例如
 * (1 + 2)
 * ((1 + 2) * 3)
 * @param str 需要计算的表达式
 * @throws Error 当计算时出现问题时会直接抛出错误
 */
export function evaluate(str: string): number {
  const ops = new Stack<string>()
  const values = new Stack<number>()
  for (let s of str) {
    switch (s) {
      case '+':
      case '-':
      case '*':
      case '/':
        ops.push(s)
        break
      case ')':
        let res = values.pop()
        const next = values.pop()
        if (res === null || next === null) {
          throw new Error()
        }
        const op = ops.pop()
        switch (op) {
          case '+':
            res = res + next
            break
          case '-':
            res = res - next
            break
          case '*':
            res = res * next
            break
          case '/':
            res = res / next
            break
        }
        values.push(res)
        break
      case '(':
      case ' ':
        break
      default:
        values.push(Number.parseInt(s))
        break
    }
  }
  return values.pop()!
}
