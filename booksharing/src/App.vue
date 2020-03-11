<template>
  <v-app>
    <v-container class="fill-height" fluid v-if="load">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="3" lg="2">
          <atom-spinner
            :animation-duration="1000"
            :size="300"
            color="#9C27B0"
          />
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <Navigation />
      <v-app-bar app clipped-left class="nav_bar">
        <v-app-bar-nav-icon class="nav_icon" @click.stop="changeDrawer()" />
        <v-toolbar-title>
          <v-btn class="appName" text @click="$router.push('/')"
            >BookSharing</v-btn
          >
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-skeleton-loader
          ref="skeleton"
          :loading="loading"
          class="mx-auto"
          type="button"
        >
          <div v-if="userData.name === undefined" class="mx-auto button_block">
            <Register />
            <Login @login="login" />
          </div>
          <UserInfo v-else />
        </v-skeleton-loader>
      </v-app-bar>

      <v-content>
        <router-view></router-view>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import { AtomSpinner } from "epic-spinners";

export default {
  name: "App",
  components: {
    Register: () => import("@/components/Main/Register"),
    Login: () => import("@/components/Main/Login"),
    UserInfo: () => import("@/components/Main/UserInfo"),
    Navigation: () => import("@/components/Main/Navigation"),
    AtomSpinner
  },
  data() {
    return {
      nav: false,
      load: true,
      loading: true,
      userData: undefined
    };
  },
  async created() {
    this.$vuetify.theme.dark = true;
    try {
      await this.$store.dispatch("getUserData");
      await this.$store.dispatch("getBooks");
      this.userData = this.$store.getters.getUData;
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
      this.load = false;
    }
  },
  methods: {
    login(user_data) {
      this.userData = user_data;
    },
    changeDrawer() {
      this.nav = !this.nav;
      this.$store.dispatch("changeDrawer", this.nav);
    }
  },
  mounted() {
    this.$root.$on("loading", loading => {
      this.loading = loading;
    });
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

* {
  font-family: "Open Sans", sans-serif;
}
.row {
  @include reset-padding-margin;
}
.nav_bar {
  background-color: $main-color !important;
  .nav_icon {
    margin-left: -0.4em !important;
  }
  .appName {
    @media screen and (max-width: 605px) {
      display: none;
    }
  }
  .button_block {
    height: auto;
    display: flex;
  }
}
</style>
