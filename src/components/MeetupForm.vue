<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <form-group label="Название">
          <app-input v-model="meetup_.title" />
        </form-group>
        <form-group label="Дата">
          <app-input v-model="inputDate" type="date" />
        </form-group>
        <form-group label="Место">
          <app-input v-model="meetup_.place" />
        </form-group>
        <form-group label="Описание">
          <app-input v-model="meetup_.description" :multiline="true" rows="3" />
        </form-group>
        <form-group label="Изображение">
          <image-uploader v-model="meetup_.imageId" />
        </form-group>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>

      <fade-transition-group tag="div">
        <template v-for="(agendaItem, index) in meetup_.agenda">
          <meetup-agenda-item-form
            class="mb-3"
            :key="agendaItem.id"
            :agendaItem.sync="meetup_.agenda[index]"
            @remove="removeAgendaItem(index)"
          />
        </template>
      </fade-transition-group>

      <div class="form-section_append">
        <base-button @click="addAgendaItem">
          + Добавить этап программы
        </base-button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <secondary-button
          :to="{ name: 'index' }"
          :block="true"
          tag="router-link"
        >
          Отмена
        </secondary-button>
        <primary-button :block="true" type="submit">
          {{ submitText }}
        </primary-button>
      </div>
    </div>
  </form>
</template>

<script>
import { cloneDeep, isEqual } from "lodash";
import {
  BaseButton,
  PrimaryButton,
  SecondaryButton
} from "@/components/Buttons";
import AppInput from "@/components/AppInput";
import FormGroup from "@/components/FormGroup";
import ImageUploader from "@/components/ImageUploader";
import MeetupAgendaItemForm from "@/components/MeetupAgendaItemForm";
import FadeTransitionGroup from "@/components/FadeTransitionGroup";

function buildAgendaItem(startsAt = "00:00") {
  return {
    id: Math.random(),
    startsAt,
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null
  };
}

export default {
  name: "MeetupForm",

  components: {
    BaseButton,
    PrimaryButton,
    SecondaryButton,
    AppInput,
    FormGroup,
    ImageUploader,
    MeetupAgendaItemForm,
    FadeTransitionGroup
  },

  props: {
    meetup: {
      type: Object,
      required: true
    },
    submitText: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      meetup_: null
    };
  },

  watch: {
    meetup: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!isEqual(newValue, this.meetup_)) {
          this.meetup_ = cloneDeep(this.meetup);
        }
      }
    },

    meetup_: {
      deep: true,
      handler(newValue) {
        this.$emit("update:meetup", cloneDeep(newValue));
      }
    }
  },

  computed: {
    inputDate: {
      get() {
        return this.dateFormat(this.meetup_.date);
      },
      set(v) {
        this.meetup_.date = v;
      }
    }
  },

  methods: {
    dateFormat(v) {
      let d = new Date(v);
      let YYYY = d.getUTCFullYear();
      let MM = (d.getUTCMonth() + 1).toString().padStart(2, "0");
      let DD = d
        .getUTCDate()
        .toString()
        .padStart(2, "0");

      return `${YYYY}-${MM}-${DD}`;
    },
    addAgendaItem() {
      let agenda = this.meetup_.agenda;
      let endsAt =
        agenda.length !== 0 ? agenda[agenda.length - 1].endsAt : undefined;

      agenda.push(buildAgendaItem(endsAt));
    },
    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1);
    },
    handleCancel() {
      this.$emit("cancel");
    },
    handleSubmit() {
      this.$emit("submit", cloneDeep(this.meetup_));
    }
  }
};
</script>

<style scoped>
.form-section_append {
  margin-top: 24px;
}

.form-section_append button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.form-section_append button:hover {
  text-decoration: underline;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
