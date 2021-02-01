<template>
  <div class="page page_onboarding">
    <form class="form" @submit.prevent>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input type="email" placeholder="demo@email" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input type="password" placeholder="password" class="form-control" />
        </div>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_primary button_block">Войти</button>
      </div>
      <div class="form__append">Нет аккаунта?
        <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>

<style scoped></style>
