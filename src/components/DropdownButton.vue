<template>
  <div :class="['dropdown', { show: showList }]">
    <button
      @click="toggleList"
      type="button"
      :class="[
        'button',
        'dropdown__toggle',
        { dropdown__toggle_icon: hasIcon }
      ]"
    >
      <app-icon
        v-if="hasIcon && selected && selected.icon"
        :icon="selected.icon"
      />
      {{ buttonText }}
    </button>

    <div :class="['dropdown__menu', { show: showList }]">
      <button
        v-for="option in options"
        :key="option.value"
        type="button"
        :class="['dropdown__item', { dropdown__item_icon: hasIcon }]"
        @click="handleClick(option)"
      >
        <app-icon v-if="hasIcon" :icon="option.icon" />
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon";

export default {
  name: "DropdownButton",

  components: { AppIcon },

  props: {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String
    }
  },

  data() {
    return {
      showList: false
    };
  },

  model: {
    prop: "value",
    event: "change"
  },

  computed: {
    hasIcon() {
      return this.options.find(i => i.icon);
    },
    buttonText() {
      return (
        this.title +
        (this.selected && this.selected.text ? ` - ${this.selected.text}` : "")
      );
    },
    defaultValue() {
      return this.value;
    },
    selected() {
      return this.options.find(i => i.value === this.defaultValue) || null;
    }
  },

  methods: {
    toggleList() {
      this.showList = !this.showList;
    },
    handleClick(v) {
      this.$emit("change", v.value);
      this.showList = false;
    }
  }
};
</script>

<style scoped></style>
