<template>
  <p class="meetup-description">{{ meetup.description }}</p>
</template>

<script>
export default {
  name: "MeetupDescriptionPage",

  props: {
    meetup: Object
  }
};
</script>

<style scoped>
.meetup-description {
  padding-top: 33px;
}
</style>
