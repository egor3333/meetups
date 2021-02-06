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
            <info-list :meetup="meetup" >
              <template #default>
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
              </template>
            </info-list>
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
import { fetchMeetupById, getMeetupCoverLink } from "@/common/api";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton
} from "@/components/Buttons";
import InfoList from "@/components/InfoList";
import FadeTransition from "@/components/FadeTransition";

export default {
  name: "MeetupPage",

  props: {
    meetupId: {
      type: String,
      required: true
    }
  },

  components: {
    PrimaryButton,
    SecondaryButton,
    DangerButton,
    InfoList,
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

<style scoped>
.content-tabs {
  margin: 0;
}

.content-tabs__nav {
  display: flex;
  flex-direction: row;
  position: relative;
}

.content-tabs__nav:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--grey-2);
}

.content-tabs__tab {
  display: inline-flex;
  padding: 10px 0;
  font-weight: 400;
  font-size: 18px;
  text-decoration: none;
  line-height: 28px;
  color: var(--grey-8);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-right: 18px;
  transition: 0.2s all;
  box-shadow: none;
  background-color: transparent;
  outline: none;
  position: relative;
  z-index: 1;
}

.content-tabs__tab:hover,
.content-tabs__tab.content-tabs__tab_active {
  border-bottom-color: var(--blue);
  color: var(--blue);
}

.meetup-cover {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-url);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 410px;
  max-width: 1216px;
  margin: 0 auto;
}

.meetup-cover__title {
  color: var(--white);
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
  padding: 0 16px;
  text-align: center;
}

@media all and (min-width: 992px) {
  .meetup-cover__title {
    font-size: 72px;
    line-height: 84px;
  }
}
</style>
