<template>
  <v-app>
    <Navigation :drawer="drawer" />
    <v-app-bar app clipped-left color="purple">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <v-btn class="appName" text @click="$router.push('/')">BookSharing</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-skeleton-loader ref="skeleton" :loading="loading" class="mx-auto" type="button">
        <div style="height:auto" v-if="userData.name === undefined" class="mx-auto">
          <Register />
          <Login @login="login" />
        </div>
        <UserInfo v-else />
      </v-skeleton-loader>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
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
    Navigation
  },
  data() {
    return {
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
