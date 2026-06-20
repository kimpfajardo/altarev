import { expect, test } from "vitest";
import { nextIndex } from "./Carousel";

test("advances within bounds", () => {
  expect(nextIndex(0, 5, 1, false)).toBe(1);
  expect(nextIndex(3, 5, -1, false)).toBe(2);
});

test("clamps at edges when not looping", () => {
  expect(nextIndex(4, 5, 1, false)).toBe(4);
  expect(nextIndex(0, 5, -1, false)).toBe(0);
});

test("wraps at edges when looping", () => {
  expect(nextIndex(4, 5, 1, true)).toBe(0);
  expect(nextIndex(0, 5, -1, true)).toBe(4);
});
