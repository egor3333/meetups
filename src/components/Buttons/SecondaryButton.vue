<template>
  <base-button class="button_secondary" v-on="$listeners" v-bind="$attrs">
    <slot />
  </base-button>
</template>

<script>
import { BaseButton } from "@/components/Buttons";

export default {
  name: "SecondaryButton",

  components: {
    BaseButton
  }
};
</script>

<style scoped>
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
