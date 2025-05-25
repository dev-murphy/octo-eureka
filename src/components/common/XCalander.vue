<script lang="ts" setup>
import { isSelectedDateToday } from "@/utils";
import dayjs from "dayjs";

const props = defineProps<{ todoDate: Date | null }>();
const emit = defineEmits<{ (e: "setDate", date: Date): void }>();

const now = new Date();
const viewDate = ref(new Date());
const selectedDate = toRef(props.todoDate);
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

// Computed property for the month and year label
const monthLabel = computed(() => dayjs(viewDate.value).format("MMM YYYY"));

// Total days in the current month
const days = computed(() => {
  const startDate = dayjs(viewDate.value).startOf("month");
  const endDate = dayjs(viewDate.value).endOf("month");
  return endDate.diff(startDate, "day") + 1;
});

// Day of the week the month starts on
const startDay = computed(() =>
  dayjs(viewDate.value).startOf("month").get("day")
);

// Day of the week the month ends on
const endDay = computed(() => dayjs(viewDate.value).endOf("month").get("day"));

// Get the last days of the previous month
const getEndDays = (day: number, monthOffset: number) => {
  return dayjs(viewDate.value)
    .subtract(1, "month")
    .endOf("month")
    .subtract(monthOffset - day, "day")
    .date();
};

// Select a specific date
const selectDate = (day: number, monthOffset?: number) => {
  if (monthOffset !== undefined) {
    viewDate.value = dayjs(viewDate.value)
      .add(monthOffset, "month")
      .date(day)
      .toDate();
  }
  selectedDate.value = dayjs(viewDate.value).date(day).toDate();
  emit("setDate", selectedDate.value);
};

// Check if a date is the selected date
const isSelectedDate = (day: number, monthOffset?: number) => {
  const date = dayjs(viewDate.value)
    .add(monthOffset || 0, "month")
    .date(day);
  return date.isSame(dayjs(selectedDate.value), "day");
};

// Check if a date is today
const isToday = (day: number, monthOffset?: number) => {
  const date = dayjs(viewDate.value)
    .add(monthOffset || 0, "month")
    .date(day);
  return date.isSame(dayjs(now), "day");
};

// Move to the next month
const nextMonth = () => {
  viewDate.value = dayjs(viewDate.value).add(1, "month").toDate();
};

// Move to the previous month
const prevMonth = () => {
  viewDate.value = dayjs(viewDate.value).subtract(1, "month").toDate();
};

watch(
  () => props.todoDate,
  () => {
    selectedDate.value = props.todoDate;
    viewDate.value = props.todoDate || new Date();
  }
);
</script>

<template>
  <div class="w-[220px] p-2 rounded-lg text-txt-500" @click.stop>
    <div class="flex items-center justify-between mb-2">
      <p>{{ monthLabel }}</p>

      <div class="flex items-center gap-x-1 text-txt-100">
        <button
          @click="prevMonth"
          class="hover:text-txt-500 transition cursor-pointer"
        >
          <Chevron class="w-5 h-5 rotate-90" />
        </button>

        <button
          @click="
            () => {
              viewDate = new Date();
              selectedDate = new Date();
            }
          "
          class="w-2 h-2 border transition rounded-full cursor-pointer"
          :class="[
            selectedDate && !isSelectedDateToday(selectedDate)
              ? 'border-txt-100 hover:border-txt-500'
              : 'bg-txt-100 border-txt-100',
          ]"
        ></button>

        <button
          @click="nextMonth"
          class="hover:text-txt-100 transition cursor-pointer"
        >
          <Chevron class="w-5 h-5 -rotate-90" />
        </button>
      </div>
    </div>

    <div class="w-full grid grid-cols-7 grid-flow-row gap-y-1">
      <div
        v-for="weekDay in daysOfWeek"
        :key="weekDay"
        class="text-sm text-accent text-center font-bold"
      >
        {{ weekDay }}
      </div>

      <!-- End of the previous month -->
      <div
        v-for="day in startDay"
        :key="day"
        class="w-7 h-7 flex items-center justify-center hover:bg-txt-500/20 text-txt-100 text-sm rounded-full select-none mx-auto"
        :class="{
          'bg-accent text-bkg-500 font-bold': isSelectedDate(
            getEndDays(day, startDay),
            -1
          ),
          'bg-accent/20 text-accent font-bold':
            isToday(getEndDays(day, startDay), -1) &&
            !isSelectedDate(getEndDays(day, startDay), -1),
        }"
        @click="selectDate(getEndDays(day, startDay), -1)"
      >
        {{ getEndDays(day, startDay) }}
      </div>

      <!-- Days of the current month -->
      <div
        v-for="day in days"
        :key="day"
        class="w-7 h-7 inline-flex items-center justify-center text-sm rounded-full select-none mx-auto"
        :class="{
          'bg-accent/20 text-accent font-bold':
            isToday(day) && !isSelectedDate(day),
          'bg-accent  text-text-500 font-bold': isSelectedDate(day),
          'hover:bg-txt-500/20': !isSelectedDate(day) && !isToday(day),
        }"
        @click="selectDate(day)"
      >
        {{ day }}
      </div>

      <!-- Start of the next month -->
      <div
        v-for="day in 6 - endDay"
        :key="day"
        class="w-7 h-7 inline-flex items-center justify-center hover:bg-txt-500/20 text-txt-100 text-sm rounded-full select-none mx-auto"
        :class="{
          'bg-accent text-bkg-500 font-bold': isSelectedDate(day, 1),
          'bg-accent/20 text-accent font-bold':
            isToday(day, 1) && !isSelectedDate(day, 1),
        }"
        @click="selectDate(day, 1)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>
