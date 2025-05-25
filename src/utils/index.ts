import dayjs from "dayjs";

export function formatDate(date: Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss.SSS");
}

export function getRelativeDate(selectedDate: Date) {
  const today = dayjs().startOf("day");
  const target = dayjs(selectedDate).startOf("day");
  const diffDays = target.diff(today, "day");

  // 1️⃣ Handle today & tomorrow
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  // 2️⃣ Handle next weekday (within the next 7 days)
  if (diffDays > 1 && diffDays < 7) return `Next ${target.format("ddd")}`;

  // 3️⃣ Handle same year → "Month Day"
  if (target.isSame(today, "year")) return target.format("MMM D");

  // 4️⃣ Handle future years → "MM/DD/YYYY"
  return target.format("MM/DD/YYYY");
}

export function isSelectedDateToday(selectedDate: Date) {
  const today = dayjs().startOf("day");
  const target = dayjs(selectedDate).startOf("day");
  const diffDays = target.diff(today, "day");

  if (diffDays === 0) return true;
  return false;
}
