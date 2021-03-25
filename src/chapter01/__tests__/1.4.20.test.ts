describe('1.4.20', () => {
  it('方法 1', () => {
    function f(arr: number[], v: number): number {
      return -1
    }

    const arr = [1, 2, 3, 4, 5, 6, 9, 8, 7]
    arr.forEach((v, i) => {
      expect(f(arr, v)).toBe(i)
    })
    expect(f(arr, 10)).toBe(-1)
  })
})
