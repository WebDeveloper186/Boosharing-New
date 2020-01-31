<template>
  <v-app>
    <v-container class="fill-height" fluid v-if="load">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="3" lg="2"
          ><atom-spinner
            :animation-duration="1000"
            :size="300"
            color="#9C27B0"
          />
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <Navigation :drawer="drawer" />
      <v-app-bar app clipped-left color="purple">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
          <div
            style="height:auto"
            v-if="userData.name === undefined"
            class="mx-auto"
          >
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
/*eslint-disable*/
import { AtomSpinner } from "epic-spinners";
import Login from "@/components/Main/Login";
import Register from "@/components/Main/Register";
import UserInfo from "@/components/Main/UserInfo";
import Navigation from "@/components/Main/Navigation";

export default {
  name: "App",
  components: {
    Register,
    Login,
    UserInfo,
    Navigation,
    AtomSpinner
  },
  data() {
    return {
      load: true,
      loading: true,
      drawer: false,
      userData: undefined
    };
  },
  /*eslint-disable */
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
    }
  },
  mounted() {
    this.$root.$on("loading", loading => {
      this.loading = loading;
    });
  }
  /*eslint-enable */
};
</script>

<style scoped>
@media screen and (max-width: 605px) {
  .appName {
    display: none;
  }
}
.row {
  padding: 0;
  margin: 0;
}
</style>
