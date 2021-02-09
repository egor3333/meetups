<template>
  <div class="page page_onboarding">
    <form class="form" @submit.prevent>
      <form-group label="Email">
        <app-input type="email" placeholder="demo@email" />
      </form-group>
      <form-group label="Пароль">
        <app-input type="password" placeholder="password" />
      </form-group>
      <div class="form__buttons">
        <primary-button type="submit" :block="true">Войти</primary-button>
      </div>
      <div class="form__append">
        Нет аккаунта?
        <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { PrimaryButton } from "@/components/Buttons";
import AppInput from "@/components/AppInput";
import FormGroup from "@/components/FormGroup";

export default {
  name: "LoginPage",

  components: {
    PrimaryButton,
    AppInput,
    FormGroup
  }
};
</script>
