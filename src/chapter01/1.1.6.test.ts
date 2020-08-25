/*
1.1.6 下面这段程序会打印出什么？
int f = 0;
int g = 1;
for (int i = 0; i <= 15; i++)
{
  StdOut.println(f);
  f = f + g;
  g = f - g;
}
 */

/*
答案：斐波那契数列
TODO 看到运行结果才最终确定的
 */

it('1.1.6', () => {
  let f = 0
  let g = 1
  for (let i = 0; i <= 15; i++) {
    console.log(f)
    f = f + g
    g = f - g
  }
})
