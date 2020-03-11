<template>
  <v-menu v-model="login" :close-on-content-click="false" max-width="350">
    <template v-slot:activator="{ on }">
      <v-btn class="login" tile text v-on="on">
        <v-icon left>exit_to_app</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>Форма авторизации</v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="email" label="E-mail"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  type="password"
                  v-model="password"
                  label="Пароль"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="login = false">Отмена</v-btn>
        <v-btn color="primary" text @click="submit">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      login: false,
      email: "",
      password: "",
      user_data: undefined
    };
  },
  /* eslint-disable*/
  methods: {
    async submit() {
      this.loading = true;
      this.$root.$emit("loading", this.loading);
      const formData = {
        email: this.email,
        password: this.password
      };
      this.clearLoginForm();
      try {
        await this.$store.dispatch("login", formData);
        this.user_data = this.$store.getters.getUData;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
        this.$root.$emit("loading", this.loading);
      }
      this.$emit("login", {
        user_data: this.user_data
      });
    },
    clearLoginForm() {
      this.email = "";
      this.password = "";
      this.login = false;
    }
  }
};
</script>

<style scoped>
.login::after {
  content: "Авторизация";
}
@media screen and (max-width: 458px) {
  .login {
    margin-left: -5px !important;
    margin-right: -15px !important;
  }
  .login::after {
    content: "";
  }
}
</style>
