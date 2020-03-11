<template>
  <v-menu v-model="register" :close-on-content-click="false" max-width="350">
    <template v-slot:activator="{ on }">
      <v-btn class="reg" tile text v-on="on">
        <v-icon left>person_add</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>Форма регистрации</v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="16"
                  label="Имя"
                  required
                  aria-autocomplete="off"
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  aria-autocomplete="off"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <masked-input
                  v-model="phone"
                  type="tel"
                  mask="\+\7 (111) 1111-111"
                  placeholder="+7 (911) 1111-111"
                  class="phone"
                />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  label="Пароль"
                  required
                  aria-autocomplete="off"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="cancel">Отмена</v-btn>
        <v-btn class="reg_btn" text @click="signIn">Зарегистрироваться</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import MaskedInput from "vue-masked-input";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";
export default {
  components: { MaskedInput },

  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(16) },
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  data() {
    return {
      register: false,
      name: "",
      email: "",
      phone: "",
      password: ""
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Имя не должно быть больше 16 символов");
      !this.$v.name.required && errors.push("Имя обязательно для заполнения.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Должен быть правильный e-mail");
      !this.$v.email.required &&
        errors.push("E-mail обязательно для заполнения.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Пароль должен состоять минимум из 6 символов");
      !this.$v.password.required &&
        errors.push("Пароль обязателен для заполнения.");
      return errors;
    }
  },
  methods: {
    cancel() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.register = false;
      this.$v.$reset();
    },
    clearRegisterForm() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.password = "";
      this.register = false;
    },
    async signIn() {
      const formData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password
      };
      try {
        this.clearRegisterForm();
        await this.$store.dispatch("register", formData);
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.reg {
  &::after {
    content: "Регистрация";
  }
  @media screen and (max-width: 458px) {
    margin-left: -15px !important;
    margin-right: -15px !important;
    &::after {
      content: "";
    }
  }
}
.phone {
  border-bottom: 1px solid;
  width: 100%;
  color: $reg-phone;
  height: 2.25em;
  &::placeholder {
    color: lightgrey;
  }
  &:focus {
    outline: none;
    border-bottom: 0.1em solid $second-color;
  }
}
.reg_btn {
  color: $second-color;
}
</style>
