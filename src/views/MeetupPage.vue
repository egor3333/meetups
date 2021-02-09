<template>
  <div class="bg-white">
    <template v-if="meetup">
      <meetup-cover :title="meetup.title" :imageId="meetup.imageId" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <content-tabs :meetup="meetup" />
          </div>
          <div class="meetup__aside">
            <info-list :meetup="meetup" />
            <div class="meetup__aside-buttons">
              <primary-button>Участвовать</primary-button>
              <secondary-button>Отменить участие</secondary-button>
              <primary-button
                tag="router-link"
                :to="{
                  name: 'edit-meetup',
                  params: { meetupId: meetup.id }
                }"
              >
                Редактировать
              </primary-button>
              <danger-button>Удалить</danger-button>
            </div>
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
import { fetchMeetupById } from "@/common/api";
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton
} from "@/components/Buttons";
import InfoList from "@/components/InfoList";
import ContentTabs from "@/components/ContentTabs";
import MeetupCover from "@/components/MeetupCover";

export default {
  name: "MeetupPage",

  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  components: {
    PrimaryButton,
    SecondaryButton,
    DangerButton,
    InfoList,
    ContentTabs,
    MeetupCover
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

  methods: {
    setMeetup(meetup) {
      this.meetup = meetup;
    }
  }
};
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__content p {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-buttons > .button {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }

  .meetup__empty {
    height: 340px;
  }
}
</style>
