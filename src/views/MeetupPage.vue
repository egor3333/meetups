<template>
  <div class="bg-white">
    <template v-if="meetup">
      <div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
      </div>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <div class="content-tabs" id="#meetupTabs">
              <div class="content-tabs__nav">
                <router-link
                  :to="{
                    name: 'meetup-description',
                    params: { meetupId },
                    hash: '#meetupTabs'
                  }"
                  class="content-tabs__tab"
                  :class="{
                    'content-tabs__tab_active':
                      $route.name === 'meetup-description'
                  }"
                >
                  Описание
                </router-link>
                <router-link
                  :to="{
                    name: 'meetup-agenda',
                    params: { meetupId },
                    hash: '#meetupTabs'
                  }"
                  class="content-tabs__tab"
                  :class="{
                    'content-tabs__tab_active': $route.name === 'meetup-agenda'
                  }"
                >
                  Программа
                </router-link>
              </div>
              <div class="content-tabs__content">
                <fade-transition>
                  <router-view :meetup="meetup" />
                </fade-transition>
              </div>
            </div>
          </div>
          <div class="meetup__aside">
            <ul class="info-list">
              <li>
                <app-icon icon="user" class="info-list__icon" />
                {{ meetup.organizer }}
              </li>
              <li>
                <app-icon icon="map" class="info-list__icon" />
                {{ meetup.place }}
              </li>
              <li>
                <app-icon icon="cal-lg" class="info-list__icon" />
                <time :datetime="meetupLocalDate">{{ meetupLocalDate }}</time>
              </li>
              <li>
                <primary-button>Участвовать</primary-button>
              </li>
              <li>
                <secondary-button>Отменить участие</secondary-button>
              </li>
              <li>
                <primary-button
                  tag="router-link"
                  :to="{ name: 'edit-meetup', params: { meetupId } }"
                  >Редактировать</primary-button
                >
              </li>
              <li>
                <danger-button>Удалить</danger-button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h3>Loading...</h3>
    </template>
  </div>
</template>

<script>
import { fetchMeetupById, getMeetupCoverLink } from "../common/api";
import AppIcon from "../components/AppIcon";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton
} from "../components/Buttons";
import FadeTransition from "../components/FadeTransition";

export default {
  name: "MeetupPage",

  props: {
    meetupId: {
      type: String,
      required: true
    }
  },

  components: {
    AppIcon,
    PrimaryButton,
    SecondaryButton,
    DangerButton,
    FadeTransition
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

  beforeRouteUpdate(to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next();
    } else {
      fetchMeetupById(to.params.meetupId).then(meetup => {
        this.setMeetup(meetup);
        next();
      });
    }
  },

  data() {
    return {
      meetup: null
    };
  },

  computed: {
    meetupLocalDate() {
      return new Date(this.meetup.date).toLocaleString(navigator.language, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    coverStyle() {
      return this.meetup.imageId
        ? { "--bg-url": `url('${getMeetupCoverLink(this.meetup)}')` }
        : {};
    }
  },

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    }
  }
};
</script>

<style scoped></style>
