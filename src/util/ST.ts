
export interface ST<K, V> {
  /**
   * 将键值对存入表中（若值为空则将键 key 从表中删除）
   */
  put(key: K, val: V): void;
  /**
   * 获取键 key 对应的值（若键 key 不存在则返回 null）
   */
  get(key: K): T;
  /**
   * 	从表中删去键 key（及其对应的值）
   */
  delete(key: K): void;
  /**
   * 键 key 在表中是否有对应的值
   * @param Key
   * @param key
   */
  contains(key: K): boolean;
  /**
   * 表是否为空
   */
  isEmpty(): boolean;
  /**
   * 表中的键值对数量
   */
  readonly size: number;
  /**
   * 表中的所有键的集合
   */
  [Symbol.iterator](): Generator<[K, V]>;
}
