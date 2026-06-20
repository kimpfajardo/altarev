import { expect, test } from "vitest";
import { cn } from "./cn";

test("later Tailwind class wins on conflict", () => {
  expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
});

test("falsy values are dropped", () => {
  expect(cn("a", false, null, undefined, "b")).toBe("a b");
});
