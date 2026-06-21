import { expect, test } from "vitest";
import { paginationRange, DOTS } from "./Pagination";

test("shows all pages when total is small", () => {
  expect(paginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
});

test("right dots only near the start", () => {
  expect(paginationRange(2, 20)).toEqual([1, 2, 3, 4, 5, DOTS, 20]);
});

test("left dots only near the end", () => {
  expect(paginationRange(19, 20)).toEqual([1, DOTS, 16, 17, 18, 19, 20]);
});

test("both dots in the middle", () => {
  expect(paginationRange(10, 20)).toEqual([1, DOTS, 9, 10, 11, DOTS, 20]);
});

test("no duplicate or missing pages across the window", () => {
  const r = paginationRange(10, 20).filter((x) => x !== DOTS) as number[];
  expect(new Set(r).size).toBe(r.length);
  expect(Math.max(...r)).toBe(20);
  expect(Math.min(...r)).toBe(1);
});
