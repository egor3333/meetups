<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <div class="input-group">
            <input class="form-control" v-model="meetup_.title" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <div class="input-group">
            <input class="form-control" type="date" v-model="inputDate"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <div class="input-group">
            <input class="form-control" v-model="meetup_.place" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea class="form-control" rows="3" v-model="meetup_.description"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>

      <template v-for="(agendaItem, index) in meetup_.agenda">
        <meetup-agenda-item-form
          class="mb-3"
          :key="agendaItem.id"
          :agendaItem.sync="meetup_.agenda[index]"
          @remove="removeAgendaItem(index)"
        />
      </template>

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <router-link
          :to="{ name: 'index' }"
          class="button button_secondary button_block"
          type="button"
        >
          Отмена
        </router-link>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { cloneDeep } from 'lodash';
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';

function buildAgendaItem(startsAt = '00:00') {
  return {
    id: Math.random(),
    startsAt,
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
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
      meetup_: cloneDeep(this.meetup)
    }
  },

  computed: {
    inputDate: {
      get() {
        return this.dateFormat(this.meetup_.date)
      },
      set(v) {
        this.meetup_.date = v
      }
    }
  },

  methods: {
    dateFormat(v) {
      let d = new Date(v)
      let YYYY = d.getUTCFullYear()
      let MM = (d.getUTCMonth() + 1).toString().padStart(2, '0')
      let DD = d.getUTCDate().toString().padStart(2, '0')

      return `${YYYY}-${MM}-${DD}`
    },
    addAgendaItem() {
      let agenda = this.meetup_.agenda
      let endsAt = agenda.length !== 0 ? agenda[agenda.length - 1].endsAt : undefined

      agenda.push(buildAgendaItem(endsAt))
    },
    removeAgendaItem(index) {
      this.meetup_.agenda.splice(index, 1)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleSubmit() {
      this.$emit('submit', cloneDeep(this.meetup_))
    }
  }
};
</script>

<style scoped></style>
