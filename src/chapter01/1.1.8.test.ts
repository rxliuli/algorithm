/*
1.1.8 下列语句会打印出什么结果？给出解释。
a. System.out.println('b');
b. System.out.println('b' + 'c');
c. System.out.println((char) ('a' + 4));
 */

/*
答案：
a. 打印字符串 b
b. 打印 bc，因为是字符串相加了
c. Java 中打印 97 + 4 = 81 = 'Q'
 */

it('1.1.8', () => {
  console.log('b')
  console.log('b' + 'c')
})
