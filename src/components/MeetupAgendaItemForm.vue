<template>
  <div class="form-section form-section_inner">
    <base-button class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </base-button>

    <form-group>
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="agendaItem_.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </form-group>
      </div>
    </div>

    <template
      v-for="fieldItem in $options.fieldSpecifications[agendaItem_.type]"
    >
      <form-group :label="fieldItem.title" :key="fieldItem.title">
        <component
          :is="fieldItem.component"
          v-model="agendaItem_[fieldItem.field]"
          v-bind="{
            multiline: fieldItem.props.multiline,
            options: fieldItem.props.options,
            title: fieldItem.props.title
          }"
        />
      </form-group>
    </template>
  </div>
</template>

<script>
import moment from "moment";
import { cloneDeep } from "lodash";
import { BaseButton } from "./Buttons";
import AppInput from "./AppInput";
import FormGroup from "./FormGroup";
import AppIcon from "./AppIcon";
import DropdownButton from "./DropdownButton";
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
  getAgendaItemLanguageOptions
} from "@/common/data";

export default {
  name: "MeetupAgendaItemForm",

  components: {
    BaseButton,
    AppInput,
    FormGroup,
    AppIcon,
    DropdownButton
  },

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
      agendaItem_: cloneDeep(this.agendaItem)
    };
  },

  watch: {
    "agendaItem_.startsAt": {
      handler(newStartsAt, prevStartsAt) {
        if (this.agendaItem_.endsAt !== "00:00") {
          let startsAtMinutesDif =
            moment.duration(newStartsAt).asMinutes() -
            moment.duration(prevStartsAt).asMinutes();
          let endsAtMinutes = moment
            .duration(this.agendaItem_.endsAt)
            .asMinutes();
          let endsAtMinutesDif = moment
            .utc(
              moment
                .duration(startsAtMinutesDif + endsAtMinutes, "minutes")
                .asMilliseconds()
            )
            .format("HH:mm");

          this.agendaItem_.endsAt = endsAtMinutesDif;
        }

        this.agendaItem_.startsAt = newStartsAt;
      }
    },
    agendaItem_: {
      deep: true,
      handler(v) {
        this.$emit("update:agendaItem", v);
      }
    }
  }
};
</script>

<style></style>
