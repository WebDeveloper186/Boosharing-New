<template>
  <v-menu v-model="user_menu" :close-on-content-click="false" :nudge-width="200" offset-x>
    <template v-slot:activator="{ on }">
      <v-btn color="white" text v-on="on">
        <v-icon>account_circle</v-icon>
        {{ user_data.name }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-list>
          <v-list-item class="menu_user">
            <v-list-item-avatar>
              <img
                src="https://pbs.twimg.com/profile_images/1986569304/image_400x400.jpg"
                alt="user"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{
                user_data.name
                }}
              </v-list-item-title>
              <v-list-item-subtitle>Пользователь</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="goto_lk" :disabled="this.$route.path == '/user'">
          <v-icon>class</v-icon>Перейти в ЛК
        </v-btn>
        <v-btn text @click="logout">
          <v-icon>keyboard_backspace</v-icon>Выйти
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return { user_menu: false, user_data: this.$store.getters.getUData };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      if (this.$route.params === "user") {
        this.$router.push("/");
      }
    },
    goto_lk() {
      this.$router.push("/user");
    }
  }
};
</script>

<style scoped>
</style>