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

<style scoped>
.meetup-agenda {
  margin: 0;
}

.meetup-agenda__item {
  padding: 24px 0;
  border-top: 1px solid var(--grey-3);
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__item:first-child {
  border-top: none;
}

.meetup-agenda__item-col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.meetup-agenda__item-col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.meetup-agenda__item-col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.meetup-agenda__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.meetup-agenda__lang {
  font-style: italic;
}

.meetup-agenda__dot::before {
  content: "•";
  color: var(--grey);
  padding: 0 1ch;
}

.meetup-agenda__item p {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .meetup-agenda__item {
    padding: 40px 0;
  }
}
</style>
