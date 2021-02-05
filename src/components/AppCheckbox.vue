<template>
  <label class="checkbox">
    <input
      type="checkbox"
      v-model="model"
      :value="value"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <slot name="default" />
    <span></span>
  </label>
</template>

<script>
import { omit } from "lodash";

export default {
  name: "AppCheckbox",

  inheritAttrs: false,

  props: {
    checked: [Boolean, Array],
    value: String
  },

  model: {
    prop: "checked",
    event: "change"
  },

  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(v) {
        this.$emit("change", v);
      }
    },
    listeners() {
      return omit(this.$listeners, ["change"]);
    }
  }
};
</script>

<style scoped></style>
