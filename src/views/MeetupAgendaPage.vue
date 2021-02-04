<template>
  <div v-if="meetup_.agenda" class="meetup-agenda">
    <div
      v-for="agenda in meetup_.agenda"
      :key="agenda.id"
      class="meetup-agenda__item"
    >
      <div class="meetup-agenda__item-col">
        <app-icon :icon="agenda.iconType" />
      </div>
      <div class="meetup-agenda__item-col">
        {{ agenda.startsAt }} - {{ agenda.endsAt }}
      </div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">
          {{ agenda.title ? agenda.title : agenda.defaultTitle }}
        </h5>
        <p v-if="agenda === 'talk'">
          <span>{{ agenda.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agenda.language }}</span>
        </p>
        <p v-if="agenda.description">{{ agenda.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgendaIconsMap, getAgendaItemTypes } from "@/common/data";
import AppIcon from "@/components/AppIcon";

export default {
  name: "MeetupAgendaPage",

  props: {
    meetup: Object
  },

  agendaItemIcons: getAgendaIconsMap(),

  agendaItemTypes: getAgendaItemTypes(),

  components: {
    AppIcon
  },

  computed: {
    meetup_() {
      if (!this.meetup) {
        return null;
      }

      return {
        ...this.meetup,
        agenda: this.meetup.agenda
          ? this.meetup.agenda.map(agenda => ({
              ...agenda,
              iconType: this.$options.agendaItemIcons[agenda.type],
              defaultTitle: this.$options.agendaItemTypes.find(
                i => i.value === agenda.type
              ).value
            }))
          : []
      };
    }
  }
};
</script>

<style scoped></style>
