<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <dropdown-button title="Тип" :options="$options.agendaItemTypes" v-model="agendaItem_.type" />
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <app-input type="time" placeholder="00:00" v-model="agendaItem_.startsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <app-input type="time" placeholder="00:00" v-model="agendaItem_.endsAt" />
        </div>
      </div>
    </div>

    <template v-for="fieldItem in $options.fieldSpecifications[agendaItem_.type]">
      <div class="form-group" :key="fieldItem.title">
        <label class="form-label">{{ fieldItem.title }}</label>
        <component
          :is="fieldItem.component"
          v-model="agendaItem_[fieldItem.field]"
          v-bind="{
            multiline: fieldItem.props.multiline,
            options: fieldItem.props.options,
            title: fieldItem.props.title
          }"
        />
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
  getAgendaItemLanguageOptions
} from '@/common/data';

const deepClone = data => {
  return JSON.parse(JSON.stringify(data))
}

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  talkLanguages: getAgendaItemLanguageOptions(),

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      agendaItem_: deepClone(this.agendaItem)
    }
  },

  watch: {
    'agendaItem_.startsAt': {
      handler(newStartsAt, prevStartsAt) {
        if (this.agendaItem_.endsAt !== '00:00') {
          let startsAtMinutesDif = moment.duration(newStartsAt).asMinutes() - moment.duration(prevStartsAt).asMinutes()
          let endsAtMinutes = moment.duration(this.agendaItem_.endsAt).asMinutes()
          let endsAtMinutesDif = moment.utc(
            moment
              .duration(startsAtMinutesDif + endsAtMinutes, "minutes")
              .asMilliseconds()
          ).format("HH:mm")

          this.agendaItem_.endsAt = endsAtMinutesDif
        }

        this.agendaItem_.startsAt = newStartsAt
      }
    },
    agendaItem_: {
      deep: true,
      handler(v) {
        this.$emit('update:agendaItem', v)
      }
    }
  }
};
</script>

<style></style>
