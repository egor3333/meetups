<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button
            @click="prevMonth"
            class="rangepicker__selector-control-left"
          />
          <div>{{ currentLocalDate }}</div>
          <button
            @click="nextMonth"
            class="rangepicker__selector-control-right"
          />
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="calendarDay in calendarDays"
          :key="calendarDay.id"
          class="rangepicker__cell"
          :class="{ rangepicker__cell_inactive: calendarDay.inactive }"
        >
          {{ calendarDay.day }}
          <a
            v-for="event in calendarDay.events"
            :key="event.id"
            class="rangepicker__event"
          >
            {{ event.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FIRST_MONTH = 0;
const LAST_MONTH = 11;

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push({
      date: +new Date(date),
      day: date.getDate(),
      events: []
    });
    date.setDate(date.getDate() + 1);
  }

  return days;
};

const getDay = date => new Date(date).getDay();

export default {
  name: "MeetupsCalendar",

  props: {
    meetups: {
      type: Array,
      required: true
    }
  },

  data() {
    let currentDate = new Date();

    return {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    };
  },

  computed: {
    currentLocalDate() {
      let localMonthDate = this.date.toLocaleString(navigator.language, {
        month: "long"
      });

      return `${localMonthDate} ${this.yearNum}`;
    },
    monthNum() {
      return this.date.getMonth();
    },
    yearNum() {
      return this.date.getFullYear();
    },

    calendarDays() {
      let calendarDays = this.createCalendarDays();

      this.meetups.forEach(meetup => {
        let meetupDateString = new Date(meetup.date).toDateString();

        calendarDays = calendarDays.map(i => {
          let calendarDateString = new Date(i.date).toDateString();
          return calendarDateString === meetupDateString
            ? { ...i, events: [...i.events, meetup] }
            : i;
        });
      });

      return calendarDays;
    }
  },

  methods: {
    nextMonth() {
      this.date.setMonth(this.monthNum + 1);
      this.date = new Date(this.date);
    },
    prevMonth() {
      this.date.setMonth(this.monthNum - 1);
      this.date = new Date(this.date);
    },
    createCalendarDays() {
      let currentMonthDays = getDaysInMonth(this.monthNum, this.yearNum);
      let prevMonthDays =
        this.monthNum === FIRST_MONTH
          ? getDaysInMonth(LAST_MONTH, this.yearNum - 1)
          : getDaysInMonth(this.monthNum - 1, this.yearNum);
      let nextMonthDays =
        this.monthNum === LAST_MONTH
          ? getDaysInMonth(FIRST_MONTH, this.yearNum + 1)
          : getDaysInMonth(this.monthNum + 1, this.yearNum);

      let allDays = [];
      let firstWeekDay = getDay(currentMonthDays[0].date);
      let lastWeekDay = getDay(
        currentMonthDays[currentMonthDays.length - 1].date
      );

      if (firstWeekDay === 1 && lastWeekDay === 0) {
        return currentMonthDays;
      }

      if (firstWeekDay !== 1) {
        allDays = prevMonthDays
          .splice(firstWeekDay === 0 ? -6 : -(firstWeekDay - 1))
          .map(i => ({ ...i, inactive: true }));
      }

      allDays = [...allDays, ...currentMonthDays];

      let lastAllDays = getDay(allDays[allDays.length - 1].date);

      if (lastAllDays !== 0) {
        let daysAfter = nextMonthDays
          .splice(0, 7 - lastAllDays)
          .map(i => ({ ...i, inactive: true }));

        allDays = [...allDays, ...daysAfter];
      }

      return allDays;
    }
  }
};
</script>

<style scoped></style>
