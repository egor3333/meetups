<template>
  <header class="header">
    <div>
      <h1>
        <router-link :to="{ name: 'index' }">
          Meetups
        </router-link>
      </h1>
    </div>
    <nav>
      <router-link v-if="showReturnToMeetups" :to="{ name: 'index' }">
        ← Вернуться к списку
      </router-link>
      <router-link :to="'/meetups?participation=attending'"
        >Мои митапы</router-link
      >
      <router-link :to="'/meetups?participation=organizing'"
        >Организуемые митапы</router-link
      >
      <router-link :to="'/meetups/create'">Создать митап</router-link>
      <router-link :to="'/login'">Войти</router-link>
      <router-link :to="'/register'">Зарегистрироваться</router-link>
      <!-- <route-link :to="">Выйти</route-link> -->
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",

  computed: {
    showReturnToMeetups() {
      return this.$route.matched.some(route => route.meta.showReturnToMeetups);
    }
  }
};
</script>

<style scoped></style>
