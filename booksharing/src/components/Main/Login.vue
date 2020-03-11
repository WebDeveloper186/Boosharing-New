<template
  >
  <v-row>
    <v-btn class="login" tile text @click="show">
      <v-icon left>exit_to_app</v-icon>
    </v-btn>
    <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="400">
      <div class="box">
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title">Вход на сайт</div>
            <div class="partition-form">
              <v-text-field v-model="email" label="Email" class="email"></v-text-field>
              <v-text-field v-model="password" label="Пароль" type="password"></v-text-field>

              <div class="margin-top"></div>

              <v-btn large color="purple" width="100%" @click="submit">Войти</v-btn>
              <v-btn large color="info" width="100%" @click="$modal.hide('demo-login')">Отменить</v-btn>
            </div>
          </div>
        </div>
        <div class="box-part" id="bp-right"></div>
      </div>
    </modal>
  </v-row>
</template>

<script>
const MODAL_WIDTH = 656;

export default {
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      email: "",
      password: ""
    };
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  watch: {
    email() {
      this.email = this.email.replace(" ", "");
    },
    password() {
      this.password = this.password.replace(" ", "");
    }
  },
  methods: {
    show() {
      this.$modal.show("demo-login");
    },
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

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.login {
  &::after {
    content: "Авторизация";
  }
  @media screen and (max-width: 458px) {
    margin-left: -5px !important;
    margin-right: -15px !important;
    &::after {
      content: "";
    }
  }
}
.box {
  background: $bg-modal;
  overflow: hidden;
  @include width-and-height(656px, 400px);
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    @include width-and-height(50%, 100%);
    &#bp-right {
      background: url("https://static.make.ua/catalog/09/printmaking-0000033__1366093018__615.jpg")
        no-repeat center;
      border-left: 1px solid white;
    }
  }
  .partition {
    @include width-and-height(100%, 100%);
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
      .email {
        margin-bottom: 20px;
      }
      .margin-top {
        margin-top: 60px;
      }
    }
  }
  button {
    margin-top: 8px;
    border-radius: 10px;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    font-size: 11px;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
