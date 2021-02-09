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

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.button.dropdown__toggle {
  border: 2px solid var(--blue-light);
  position: relative;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border-radius: 8px;
  padding-right: 56px;
  font-weight: 500;
}

.button.dropdown__toggle:after {
  content: "";
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url("../assets/icons/icon-chevron-down.svg") no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: 0.2s transform;
}

.button.dropdown__toggle.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown__toggle_icon .icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}

.show > .button.dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.show > .button.dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  margin: 0;
  width: 100%;
  padding: 0;
  border-radius: 0 0 8px 8px;
  left: 0;
  z-index: 95;
  background-clip: padding-box;
  display: none;
  flex-direction: column;
  border: 2px solid var(--blue);
  border-top: none;
  overflow: hidden;
}

.dropdown__menu.show {
  display: flex;
  position: absolute;
  transform: translate3d(0px, 52px, 0px);
  top: -1px;
  left: 0;
  will-change: transform;
  right: auto;
  bottom: auto;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item.dropdown__item_icon > .icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}
</style>
