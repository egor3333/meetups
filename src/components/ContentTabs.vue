<template>
  <div class="content-tabs" id="#meetupTabs">
    <div class="content-tabs__nav">
      <router-link
        :to="{
          name: 'meetup-description',
          params: { meetupId: meetup.id },
          hash: '#meetupTabs'
        }"
        class="content-tabs__tab"
        :class="{
          'content-tabs__tab_active': $route.name === 'meetup-description'
        }"
      >
        Описание
      </router-link>
      <router-link
        :to="{
          name: 'meetup-agenda',
          params: { meetupId: meetup.id },
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
</template>

<script>
import FadeTransition from "@/components/FadeTransition";

export default {
  name: "ContentTabs",

  components: {
    FadeTransition
  },

  props: {
    meetup: Object
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
</style>
