/*
1.1.31 随机连接。编写一段程序，从命令行接受一个整数 N 和 double 值 p（0 到 1 之间）作为参数，
在一个圆上画出大小为 0.05 且间距相等的 N 个点，然后将每对点按照概率 p 用灰线连接。
 */
/*
答案：TODO 由于暂时不涉及到 ui 相关操作，所以暂不实现
 */
it('1.1.31', () => {
  function f(n: number) {
    const res = []
    for (let i = 0; i < n; i++) {
      res.push({ x: n, y: Math.random() })
    }
    return res
  }
  console.log(f(10))
})
