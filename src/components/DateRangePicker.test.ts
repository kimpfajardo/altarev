import { expect, test } from "vitest";
import { presetRanges } from "./DateRangePicker";

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const now = new Date(2024, 5, 12, 15, 30);

test("today is a single day at midnight", () => {
  const { today } = presetRanges(now);
  expect(iso(today.from!)).toBe("2024-06-12");
  expect(iso(today.to!)).toBe("2024-06-12");
  expect(today.from!.getHours()).toBe(0);
});

test("yesterday is the prior day", () => {
  expect(iso(presetRanges(now).yesterday.from!)).toBe("2024-06-11");
});

test("this week starts Monday", () => {
  expect(iso(presetRanges(now).thisWeek.from!)).toBe("2024-06-10");
  expect(iso(presetRanges(now).thisWeek.to!)).toBe("2024-06-12");
});

test("last week is the full prior Mon-Sun", () => {
  const { lastWeek } = presetRanges(now);
  expect(iso(lastWeek.from!)).toBe("2024-06-03");
  expect(iso(lastWeek.to!)).toBe("2024-06-09");
});

test("this month from the 1st to today", () => {
  const { thisMonth } = presetRanges(now);
  expect(iso(thisMonth.from!)).toBe("2024-06-01");
  expect(iso(thisMonth.to!)).toBe("2024-06-12");
});

test("last month spans the full prior month", () => {
  const { lastMonth } = presetRanges(now);
  expect(iso(lastMonth.from!)).toBe("2024-05-01");
  expect(iso(lastMonth.to!)).toBe("2024-05-31");
});

test("last month handles year boundary", () => {
  const jan = new Date(2024, 0, 15);
  const { lastMonth } = presetRanges(jan);
  expect(iso(lastMonth.from!)).toBe("2023-12-01");
  expect(iso(lastMonth.to!)).toBe("2023-12-31");
});

test("this week handles Sunday correctly", () => {
  const sunday = new Date(2024, 5, 16);
  expect(iso(presetRanges(sunday).thisWeek.from!)).toBe("2024-06-10");
});
