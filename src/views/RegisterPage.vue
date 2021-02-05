<template>
  <div class="page page_onboarding">
    <form class="form" @submit.prevent>
      <form-group label="Email">
        <app-input type="email" placeholder="demo@email" />
      </form-group>
      <form-group label="Имя">
        <app-input type="text" />
      </form-group>
      <form-group label="Пароль">
        <app-input type="password" />
      </form-group>
      <form-group label="Повтор пароля">
        <app-input type="password" />
      </form-group>
      <form-group>
        <app-checkbox>Я согласен с условиями</app-checkbox>
      </form-group>
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
import AppInput from "@/components/AppInput";
import AppCheckbox from "@/components/AppCheckbox";
import FormGroup from "@/components/FormGroup";

export default {
  name: "RegisterPage",

  components: {
    PrimaryButton,
    AppInput,
    AppCheckbox,
    FormGroup
  }
};
</script>

<style scoped></style>
