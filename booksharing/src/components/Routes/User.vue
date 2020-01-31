<template>
  <v-row>
    <UserCard />
  </v-row>
</template>

<script>
import UserCard from "@/components/User/UserCard";

export default {
  metaInfo() {
    return {
      title: `Личный кабинет - ${this.$store.state.appName}`
    };
  },
  components: {
    UserCard
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

<style scoped>
.row {
  padding: 0;
  margin: 0;
}
</style>
