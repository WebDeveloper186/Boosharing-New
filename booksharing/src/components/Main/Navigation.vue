<template>
  <v-navigation-drawer
    v-model="nav"
    app
    clipped
    :disable-route-watcher="true"
    width="200"
    class="navi"
  >
    <v-list dense class="transparent">
      <v-list-item class="px-1" v-for="item in navigation" :key="item.name">
        <v-btn text @click="changePage(item.link)" class="nav_button">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["drawer"],
  data() {
    return {
      navigation: this.$store.getters.getLinks,
      nav: this.$store.getters.getDrawer
    };
  },
  created() {
    this.$store.watch(
      (state, getters) => getters.getDrawer,
      newValue => {
        this.nav = newValue;
      }
    );
  },
  methods: {
    changePage(page) {
      if (page == "/") {
        this.$router.push(`${page}`);
      } else {
        this.$router.push(`/${page}`);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.navi {
  background: $gradient-first;
  background: $navigation_gradient;
  .transparent {
    background: inherit;
  }
}
</style>
