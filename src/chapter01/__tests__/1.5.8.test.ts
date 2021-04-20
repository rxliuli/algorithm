/*
1.5.8　用一个反例证明 quick-find 算法中的 union() 方法的以下直观实现是错误的：

```java
public void union(int p, int q)
{
   if (connected(p, q)) return;
   // 将p 的分量重命名为q 的分量
   for (int i = 0; i < id.length; i++)
       if (id[i] == id[p]) id[i] = id[q];
   count--;
}

这种做法会导致当 i=p 时，id[p] 会被修改，之后原本与 id[p] 相等的值都不会被修改
```
 */

import { UFWithQuickFind } from '../UF'

class UF extends UFWithQuickFind {
  union(p: number, q: number): void {
    if (this.connected(p, q)) {
      return
    }
    // 将p 的分量重命名为q 的分量
    for (let i = 0; i < this.idList.length; i++) {
      if (this.idList[i] == this.idList[p]) {
        this.idList[i] = this.idList[q]
      }
    }
    this._count--
  }
}

it('1.5.8', () => {
  const uf = new UF(10)
  uf.union(0, 1)
  expect(uf.connected(0, 1)).toBeTruthy()
  uf.union(0, 2)
  expect(uf.connected(0, 1)).toBeFalsy()
  uf.union(0, 3)
  expect(uf.connected(0, 2)).toBeFalsy()
})
