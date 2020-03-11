<template>
  <v-row>
    <UserCard />
  </v-row>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Личный кабинет - ${this.$store.state.appName}`
    };
  },
  components: {
    UserCard: () => import("@/components/User/UserCard")
  },
  created() {
    const uData = this.$store.getters.getUData;
    if (uData.uid === undefined) {
      this.$router.push("/");
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.row {
  @include reset-padding-margin;
}
</style>
