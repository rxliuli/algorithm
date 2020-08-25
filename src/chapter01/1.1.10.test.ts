/*
1.1.10 下面这段代码有什么问题？
int[] a;
for (int i = 0; i < 10; i++)
a[i] = i * i;
解答：它没有用 new 为 a[] 分配内存。这段代码会产生一个 variable a might not have
been initialized 的编译错误。
 */

/*
答案：
错误上面已经说明了，下面来尝试分析正确的情况下的值，应该产生了一个数组，数量为 10，每个下标的值是下标的平方
 */

it('1.1.10', () => {
  function foo(num: number) {
    const a: number[] = []
    for (let i = 0; i < num; i++) a[i] = i * i
    return a
  }
  console.log(foo(10))
})
