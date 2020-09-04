import Benchmark from 'benchmark'

/**
 * 测试性能
 * @param arr
 * @param fn1
 * @param fn2
 */
export function testPerformance(
  fn1: (arr: number[]) => number[],
  fn2: (arr: number[]) => number[],
  arr: number[],
) {
  const f1Count = new Benchmark(() => fn1(arr)).run().count
  const f2Count = new Benchmark(() => fn2(arr)).run().count
  console.log(f1Count)
  console.log(f2Count)
  expect(f1Count).toBeGreaterThanOrEqual(f2Count)
}
