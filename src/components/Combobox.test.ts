import { expect, test } from "vitest";
import { filterOptions, type ComboboxOption } from "./Combobox";

const opts: ComboboxOption[] = [
  { value: "a", label: "Apple" },
  { value: "b", label: "Banana" },
  { value: "c", label: "Cherry" },
];

test("empty query returns all options", () => {
  expect(filterOptions(opts, "")).toHaveLength(3);
  expect(filterOptions(opts, "  ")).toHaveLength(3);
});

test("matches case-insensitive substring", () => {
  expect(filterOptions(opts, "an").map((o) => o.value)).toEqual(["b"]);
  expect(filterOptions(opts, "ERR").map((o) => o.value)).toEqual(["c"]);
});

test("no match returns empty", () => {
  expect(filterOptions(opts, "zzz")).toEqual([]);
});
