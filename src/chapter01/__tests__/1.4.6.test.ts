/*
1.4.6　给出以下代码段的运行时间的增长数量级（作为 N 的函数）：

　　　a.

int sum = 0;
for (int n = N; n > 0; n /= 2)
  for(int i = 0; i < n; i++)
      sum++;
　　　b.

int sum = 0;
for (int i = 1; i < N; i *= 2)
    for (int j = 0; j < i; j++)
        sum++;
　　　c.

int sum = 0;
for (int i = 1; i < N; i *= 2)
   for (int j = 0; j < N; j++)
       sum++;

TODO 待定
 */

it('1.4.6', () => {})
