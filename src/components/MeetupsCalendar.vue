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

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url("../assets/icons/icon-pill-active.svg") left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }

  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
