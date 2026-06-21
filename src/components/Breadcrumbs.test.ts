import { expect, test } from "vitest";
import { collapseItems, type BreadcrumbItem } from "./Breadcrumbs";

const mk = (n: number): BreadcrumbItem[] =>
  Array.from({ length: n }, (_, i) => ({ label: `P${i}`, href: `/${i}` }));

test("no collapse when within maxItems", () => {
  const out = collapseItems(mk(3), 4);
  expect(out).toHaveLength(3);
  expect(out.some((s) => typeof s === "symbol")).toBe(false);
});

test("no collapse when maxItems undefined", () => {
  expect(collapseItems(mk(10), undefined)).toHaveLength(10);
});

test("collapses middle, keeps first + last when over maxItems", () => {
  const out = collapseItems(mk(6), 4);
  expect(out).toHaveLength(5);
  expect(typeof out[1]).toBe("symbol");
  const labels = out
    .filter((s) => typeof s !== "symbol")
    .map((s) => (s as { item: BreadcrumbItem }).item.label);
  expect(labels).toEqual(["P0", "P3", "P4", "P5"]);
});
