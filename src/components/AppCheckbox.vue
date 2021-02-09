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

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: "";
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url("../assets/icons/icon-check.svg");
  border: none;
  transform: translate(-50%, -50%);
}
</style>
