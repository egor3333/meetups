<template>
  <div class="page page_meetup-forms">
    <div class="container">
      <h2 class="page__title">Создание митапа</h2>
      <meetup-form
        :meetup="meetup"
        submit-text="Создать"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import MeetupForm from '../components/MeetupForm'

export default {
  name: 'CreateMeetup',

  components: {
    MeetupForm
  },

  data() {
    return {
      meetup: {
        id: 0,
        title: '',
        description: '',
        imageId: null,
        date: new Date(),
        place: '',
        agenda: [],
      },
    };
  },

  methods: {
    handleSubmit(meetup) {
      this.meetup = meetup;
    }
  },
}
</script>

<style scoped></style>