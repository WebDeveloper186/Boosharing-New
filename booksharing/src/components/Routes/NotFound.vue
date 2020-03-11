<template>
  <v-row justify="center">
    <center class="center">
      <v-img class="ma-5" src="http://www.limpfish.com/notfound.gif"></v-img>
    </center>
  </v-row>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Страница не найдена - ${this.$store.state.appName}`
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.center {
  margin-top: 10%;
  img {
    width: 100%;
    height: 100%;
    @include reset-padding-margin;
  }
}
</style>
