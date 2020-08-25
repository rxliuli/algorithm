/**
 * 随机数生成器（从 0 开始，不包含最大值）
 * 线性同余生成器
 * @link 网上常能见到的一段 JS 随机数生成算法如下，为什么用 9301, 49297, 233280 这三个数字做基数？ - 猫杀的回答 - 知乎
 https://www.zhihu.com/question/22818104/answer/22744803
 */
export const rand = (function () {
  let seed = Date.now()

  function rnd() {
    seed = (seed * 9301 + 49297) % 233280.0
    return seed / 233280.0
  }

  return function rand(num: number) {
    // return Math.ceil(rnd(seed) * number);
    return Math.floor(rnd() * num)
  }
})()
