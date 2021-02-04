<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h2 class="page__title">Редактирование митапа</h2>
      <meetup-form
        :meetup="meetup"
        v-if="meetup"
        submit-text="Сохранить"
        @submit="setMeetup"
      />
    </div>
  </div>
</template>

<script>
import { fetchMeetupById } from "../common/api";
import MeetupForm from "../components/MeetupForm";

export default {
  name: "EditMeetup",

  components: {
    MeetupForm
  },

  beforeRouteEnter(to, from, next) {
    fetchMeetupById(to.params.meetupId)
      .then(meetup => {
        next(vm => {
          vm.setMeetup(meetup);
        });
      })
      .catch(() => {
        next("/meetups");
      });
  },

  data() {
    return {
      meetup: null
    };
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    }
  }
};
</script>

<style scoped></style>
