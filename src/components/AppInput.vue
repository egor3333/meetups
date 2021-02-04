<template>
  <div class="input-group" :class="inputGroupStyles">
    <slot name="left-icon" />

    <component
      class="form-control"
      :class="inputStyles"
      :is="isMultiline"
      :value.prop="value"
      v-bind="$attrs"
      v-on="listeners"
    />

    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: "AppInput",

  inheritAttrs: false,

  props: {
    small: {
      type: Boolean
    },
    rounded: {
      type: Boolean
    },
    multiline: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
  },

  model: {
    prop: "value",
    event: "input"
  },

  computed: {
    inputStyles() {
      return {
        "form-control_rounded": this.rounded,
        "form-control_sm": this.small
      };
    },
    inputGroupStyles() {
      let leftIcon = this.$slots["left-icon"];
      let rightIcon = this.$slots["right-icon"];

      return {
        "input-group_icon": leftIcon || rightIcon,
        "input-group_icon-left": leftIcon,
        "input-group_icon-right": rightIcon
      };
    },
    isMultiline() {
      return this.multiline ? "textarea" : "input";
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
        change: this.handleChange
      };
    }
  },

  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
    }
  }
};
</script>

<style scoped></style>
