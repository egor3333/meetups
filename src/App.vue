<template>
  <div id="app">
    <base-layout>
      <template #default>
        <router-view />
      </template>
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from './components/BaseLayout'

export default {
  name: 'App',

  components: {
    BaseLayout
  }
}
</script>
