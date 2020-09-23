interface List<T> {
  readonly length: number;
  get(idx: number): T;
  set(idx: number, val: T): void;
  insert(idx: number, val: T): void;
  add(val: T): void;
  remove(idx: number): void;
}
