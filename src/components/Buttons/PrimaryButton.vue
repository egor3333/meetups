<template>
  <base-button class="button_primary" v-on="$listeners" v-bind="$attrs">
    <slot />
  </base-button>
</template>

<script>
import { BaseButton } from "@/components/Buttons";

export default {
  name: "PrimaryButton",

  components: {
    BaseButton
  }
};
</script>

<style scoped>
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>
