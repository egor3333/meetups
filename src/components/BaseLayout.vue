<template>
  <div class="wrapper bg-grey">
    <the-header />
    <main class="main">
      <slot name="default" />
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "BaseLayout",

  components: {
    TheHeader,
    TheFooter
  }
};
</script>
