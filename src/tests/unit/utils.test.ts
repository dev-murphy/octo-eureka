import { describe, it, expect } from "vitest";
import { getRelativeDate, isSelectedDateToday } from "../../utils";
import dayjs from "dayjs";

describe("Utility Functions", () => {
  it("should show relative date based on selected date", () => {
    const currentDay = dayjs(new Date());
    const today = currentDay.add(1, "day");
    const inTheWeek = currentDay.add(3, "day");
    const inTheYear = currentDay.add(4, "month");
    const later = currentDay.add(2, "year");

    expect(getRelativeDate(currentDay.toDate())).toBe("Today");
    expect(getRelativeDate(today.toDate())).toBe("Tomorrow");
    expect(getRelativeDate(inTheWeek.toDate())).toBe(
      `Next ${inTheWeek.format("ddd")}`
    );
    expect(getRelativeDate(inTheYear.toDate())).toBe(
      `${inTheYear.format("MMM D")}`
    );
    expect(getRelativeDate(later.toDate())).toBe(
      `${later.format("MM/DD/YYYY")}`
    );
  });

  it("should check if selected date is today or not", () => {
    const today = dayjs(new Date());
    const notToday = today.subtract(3, "day");

    expect(isSelectedDateToday(today.toDate())).toBe(true);
    expect(isSelectedDateToday(notToday.toDate())).toBe(false);
  });
});
