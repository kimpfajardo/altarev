import { expect, test } from "vitest";
import { splitCode } from "./AuthCode";

test("pads to length with empty strings", () => {
  expect(splitCode("12", 4)).toEqual(["1", "2", "", ""]);
});

test("strips non-digits and truncates to length", () => {
  expect(splitCode("1a2b3c4d5", 4)).toEqual(["1", "2", "3", "4"]);
});

test("empty input yields all-empty cells", () => {
  expect(splitCode("", 6)).toEqual(["", "", "", "", "", ""]);
});
