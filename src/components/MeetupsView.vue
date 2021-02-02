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
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <app-icon icon="search" />
            <input
              id="filters-panel__search"
              class="form-control form-control_rounded form-control_sm"
              type="text"
              placeholder="Поиск"
              :value="search"
              @input="handleSearchInput"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs :selected="view" :handleSelected="handlePageTabs"></page-tabs>
        </div>
      </div>
    </div>

    <template v-if="filteredMeetups && filteredMeetups.length">
      <meetups-list
        v-if="view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="view === 'calendar'"
        :meetups="filteredMeetups"
        key="calendar"
      ></meetups-calendar>
    </template>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>
  </div>
</template>

<script>
import { fetchMeetups } from '@/common/api';
import MeetupsList from '@/components/MeetupsList';
import MeetupsCalendar from '@/components/MeetupsCalendar';
import PageTabs from '@/components/PageTabs';
import FormCheck from '@/components/FormCheck';
import AppEmpty from '@/components/AppEmpty';
import AppIcon from '@/components/AppIcon';

export default {
  name: 'MeetupsPage',

  dateFilterOptions: [
    { text: 'Все', value: 'all' },
    { text: 'Прошедшие', value: 'past' },
    { text: 'Ожидаемые', value: 'future' },
  ],

  components: {
    MeetupsList,
    MeetupsCalendar,
    PageTabs,
    FormCheck,
    AppEmpty,
    AppIcon,
  },

  props: {
    date: String,
    participation: String,
    search: String,
    view: String,
  },

  data() {
    return {
      rawMeetups: [],
    };
  },

  mounted() {
    this.fetchMeetups();
  },

  computed: {
    meetups() {
      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId
          ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : undefined,
        coverStyle: meetup.imageId
          ? {
              '--bg-url': `url('https://course-vue.javascript.ru/api/images/${meetup.imageId}')`,
            }
          : {},
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        dateOnlyString: new Date(meetup.date).toISOString().split('T'),
      }));
    },

    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.date === 'all' ||
        (this.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (this.date === 'future' && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.participation === 'all' ||
        (this.participation === 'organizing' && meetup.organizing) ||
        (this.participation === 'attending' && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(this.search.toLowerCase());

      return this.meetups.filter(
        (meetup) =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup),
      );
    },
  },

  methods: {
    async fetchMeetups() {
      this.rawMeetups = await fetchMeetups();
    },
    handleSearchInput(e) {
      this.$emit('update:search', e.target.value)
    },
    handlePageTabs(v) {
      this.$emit('update:view', v)
    }
  },
};
</script>

<style scoped></style>
