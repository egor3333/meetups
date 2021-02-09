<template>
  <div class="container">
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check
          :options="$options.dateFilterOptions"
          :value="date"
          @change="$emit('update:date', $event)"
        ></form-check>
      </div>

      <div class="filters-panel__col">
        <form-group inline>
          <app-input
            small
            rounded
            id="filters-panel__search"
            type="text"
            placeholder="Поиск"
            v-model="searchInput"
          >
            <template #left-icon>
              <app-icon icon="search" />
            </template>
          </app-input>
        </form-group>
        <form-group inline>
          <page-tabs
            :selected="view"
            :handleSelected="handlePageTabs"
          />
        </form-group>
      </div>
    </div>

    <template v-if="filteredMeetups && filteredMeetups.length">
      <fade-transition>
        <meetups-list
          v-if="view === 'list'"
          :meetups="filteredMeetups"
          key="list"
        />
        <meetups-calendar
          v-else-if="view === 'calendar'"
          :meetups="filteredMeetups"
          key="calendar"
        />
      </fade-transition>
    </template>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import { fetchMeetups } from "@/common/api";
import MeetupsList from "@/components/MeetupsList";
import MeetupsCalendar from "@/components/MeetupsCalendar";
import PageTabs from "@/components/PageTabs";
import FormCheck from "@/components/FormCheck";
import AppEmpty from "@/components/AppEmpty";
import AppIcon from "@/components/AppIcon";
import FadeTransition from "@/components/FadeTransitionGroup";
import FormGroup from "@/components/FormGroup";
import AppInput from '@/components/AppInput';

export default {
  name: "MeetupsPage",

  dateFilterOptions: [
    { text: "Все", value: "all" },
    { text: "Прошедшие", value: "past" },
    { text: "Ожидаемые", value: "future" }
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
    AppIcon,
    FadeTransition,
    FormGroup,
    AppInput
  },

  props: {
    date: String,
    participation: String,
    search: String,
    view: String
  },

  data() {
    return {
      rawMeetups: []
    };
  },

  mounted() {
    this.fetchMeetups();
  },

  computed: {
    meetups() {
      return this.rawMeetups.map(meetup => ({
        ...meetup,
        cover: meetup.imageId
          ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : undefined,
        coverStyle: meetup.imageId
          ? {
              "--bg-url": `url('https://course-vue.javascript.ru/api/images/${meetup.imageId}')`
            }
          : {}
      }));
    },

    searchInput: {
      get() {
        return this.search
      },
      set(v) {
        this.$emit("update:search", v);
      }
    },

    filteredMeetups() {
      const dateFilter = meetup =>
        this.date === "all" ||
        (this.date === "past" && new Date(meetup.date) <= new Date()) ||
        (this.date === "future" && new Date(meetup.date) > new Date());

      const participationFilter = meetup =>
        this.participation === "all" ||
        (this.participation === "organizing" && meetup.organizing) ||
        (this.participation === "attending" && meetup.attending);

      const searchFilter = meetup =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(" ")
          .toLowerCase()
          .includes(this.search.toLowerCase());

      return this.meetups.filter(
        meetup =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup)
      );
    }
  },

  methods: {
    async fetchMeetups() {
      this.rawMeetups = await fetchMeetups();
    },
    handlePageTabs(v) {
      this.$emit("update:view", v);
    }
  }
};
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}

@media all and (max-width: 480px) {
  #filters-panel__search {
    width: calc(100% - 112px);
  }

  #filters-panel__search > .form-control {
    max-width: 100%;
  }
}
</style>
