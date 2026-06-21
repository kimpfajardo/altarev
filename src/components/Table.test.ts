import { expect, test } from "vitest";
import { selectionState } from "./Table";

test("none selected", () => {
  expect(selectionState(0, 5)).toEqual({
    checked: false,
    indeterminate: false,
  });
});

test("some selected is indeterminate", () => {
  expect(selectionState(2, 5)).toEqual({ checked: false, indeterminate: true });
});

test("all selected is checked", () => {
  expect(selectionState(5, 5)).toEqual({ checked: true, indeterminate: false });
});

test("empty table is neither", () => {
  expect(selectionState(0, 0)).toEqual({
    checked: false,
    indeterminate: false,
  });
});
