import { expect, test } from "vitest";
import { clampPercent } from "./Progress";

test("passes through in-range values", () => {
  expect(clampPercent(0)).toBe(0);
  expect(clampPercent(50)).toBe(50);
  expect(clampPercent(100)).toBe(100);
});

test("clamps out-of-range values", () => {
  expect(clampPercent(-20)).toBe(0);
  expect(clampPercent(150)).toBe(100);
});
