/*
1.1.33 矩阵库。编写一个 Matrix 库并实现以下 API：
public class Matrix
  static double dot(double[] x, double[] y) 向量点乘
  static double[][] mult(double[][] a, double[][] b) 矩阵和矩阵之积
  static double[][] transpose(double[][] a) 转置矩阵
  static double[] mult(double[][] a, double[] x) 矩阵和向量之积
  static double[] mult(double[] y, double[][] a) 向量和矩阵之积
编写一个测试用例，从标准输入读取矩阵并测试所有方法。
 */
/*
答案：TODO 不知道问题是什么，跳过
 */
describe('1.1.33', () => {
  class Matrix {
    //向量点乘
    static dot(x: number[], y: number[]): number {
      throw new Error('dot')
    }
    //转置矩阵
    static transpose(a: number[][]): number[][] {
      throw new Error('transpose')
    }
    //矩阵和矩阵之积
    static mult1(a: number[][], b: number[][]): number[][] {
      throw new Error('mult')
    }
    //矩阵和向量之积
    static mult2(a: number[][], x: number[]): number[] {
      throw new Error('mult')
    }
    //向量和矩阵之积
    static mult3(y: number[], a: number[][]): number[] {
      throw new Error('mult')
    }
  }

  it('测试', () => {

  })
})
