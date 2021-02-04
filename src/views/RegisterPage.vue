<template>
  <div class="page page_onboarding">
    <form class="form" @submit.prevent>
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input type="email" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Имя</label>
        <div class="input-group">
          <input type="text" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input type="password" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Повтор пароля</label>
        <div class="input-group">
          <input type="password" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="checkbox"
          ><input type="checkbox"/> Я согласен с условиями <span></span
        ></label>
      </div>
      <div class="form__buttons">
        <primary-button type="submit">Зарегистрироваться</primary-button>
      </div>
      <div class="form__append">
        Уже есть аккаунт?
        <router-link to="/login" class="link">Войдите</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { PrimaryButton } from "@/components/Buttons";

export default {
  name: "RegisterPage",

  components: {
    PrimaryButton
  }
};
</script>

<style scoped></style>
