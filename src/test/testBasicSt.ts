import { sort } from '../util/sort';
import { ST } from '../util/ST';

export function testBasicSt(st: ST<number, number>) {
  st.put(1, 1);
  st.put(2, 2);
  st.put(3, 3);
  expect(st.size).toBe(3);
  expect(st.isEmpty()).toBeFalsy();
  expect(sort(Array.from(st), ([k]) => k)).toEqual([
    [1, 1],
    [2, 2],
    [3, 3],
  ]);
  st.put(3, 4);
  expect(st.get(3)).toBe(4);
  expect(st.get(1)).toBe(1);
  expect(st.get(2)).toBe(2);
  expect(st.get(4)).toBeNull();
  st.delete(3);
  expect(sort(Array.from(st), ([k]) => k)).toEqual([
    [1, 1],
    [2, 2],
  ]);
  st.delete(1);
  st.delete(2);
  expect(st.get(1)).toBeNull();
  expect(st.isEmpty()).toBeTruthy();
}
