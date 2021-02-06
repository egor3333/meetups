<template>
  <div class="meetups-list">
    <meetups-list-item
      v-for="meetup in meetups"
      :meetup="meetup"
      :key="meetup.id"
    ></meetups-list-item>
  </div>
</template>

<script>
import MeetupsListItem from "@/components/MeetupsListItem";

export default {
  name: "MeetupsList",

  props: {
    meetups: {
      type: Array,
      required: true
    }
  },

  components: {
    MeetupsListItem
  }
};
</script>

<style scoped></style>
