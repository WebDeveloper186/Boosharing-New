<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-card class="mobile" width="100%">
        <v-img
          src="https://pbs.twimg.com/profile_images/1986569304/image_400x400.jpg"
          class="mobile-img"
        ></v-img>
        <div>
          <p style="margin: 15px;">Имя пользователя: {{ user.name }}</p>
          <v-divider></v-divider>
          <p style="margin: 15px; padding-bottom: 15px;">Телефон: {{ user.phone }}</p>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.getters.getUData
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.row {
  @include reset-padding-margin;
}
.mobile {
  .mobile-img {
    @media screen and (max-width: 350px) {
      width: 200px;
    }
    @media screen and (max-width: 400px) {
      width: 350px;
    }
  }
  @media screen and (max-width: 450px) {
    width: 400px;
    & .mobile-img {
      width: 400px;
    }
  }
}
</style>
