import { sortBy } from '@liuli-util/array'

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * 重新排序后比较两个数组是否有序
       * @param arr
       * @param fn
       */
      toEqualSort<T>(arr: T[], fn?: (item: T) => any): R
    }
  }
}

expect.extend({
  toEqualSort<T>(
    received: T[],
    arr: T[],
    fn: (item: T) => any = (item) => JSON.stringify(item),
  ) {
    const stringify = (arr: T[]) => JSON.stringify(sortBy(arr, fn))
    const pass: boolean = stringify(received) === stringify(arr)
    const message: () => string = () => (pass ? '' : `两个数组并不相等`)

    return {
      message,
      pass,
    }
  },
})

it('', () => {})
