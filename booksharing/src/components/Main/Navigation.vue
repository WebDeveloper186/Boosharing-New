<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item v-for="item in navigation" :key="item.name">
        <v-btn text @click="changePage(item.link)">
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
/*eslint-disable*/
export default {
  props: ["drawer"],
  data() {
    return {
      navigation: this.$store.getters.getLinks
    };
  },
  methods: {
    changePage(page) {
      this.$router.push(`/${page}`);
    }
  }
};
</script>

<style scoped>
</style>