<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            class="mx-auto"
            width="100%"
            height="100%"
            :src="books[0].data.img"
            style="border-radius:15px"
          ></v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            class="mx-auto mobile-width"
            :flat="flat"
            :outlined="outlined"
            :raised="raised"
            height="100%"
            style="border-radius:15px; width:55%"
          >
            <v-card-title>
              <v-spacer></v-spacer>Описание книги
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="description">
              <p>
                <b style="text-transform: uppercase">Название:</b>
                {{books[0].name}}
              </p>
              <p>
                <b style="text-transform: uppercase">Автор:</b>
                <v-chip
                  color="#C8E7A1"
                  :outlined="true"
                  small
                  style="margin-bottom: 5px;"
                  @click="$router.push(`/books?author=${books[0].data.author}`)"
                >
                  <v-icon left>create</v-icon>
                  {{books[0].data.author}}
                </v-chip>
              </p>
              <p>
                <b style="text-transform: uppercase">Владелец:</b>
                <v-chip
                  v-for="owner in books[0].data.owners"
                  :key="owner.name"
                  color="#B584E0"
                  :outlined="true"
                  pill
                  small
                  style="margin-bottom:10px !important; cursor:pointer"
                >
                  <v-icon left>mdi-account</v-icon>
                  {{owner.name}}
                </v-chip>
              </p>
              <p>
                Жанр:
                <v-chip
                  color="#89DAFF"
                  :outlined="true"
                  small
                  style="margin-bottom: 5px;"
                  @click="$router.push(`/books?genre=${books[0].data.genre}`)"
                >
                  <v-icon left>import_contacts</v-icon>
                  {{books[0].data.genre}}
                </v-chip>
              </p>
              <p>
                <b style="text-transform: uppercase">Краткое описание:</b>
                {{books[0].data.short_description}}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple">Заказать книгу</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
/*eslint-disable*/
export default {
  metaInfo() {
    return {
      title: `${this.books[0].name} - ${this.$store.state.appName}`
    };
  },
  data() {
    return {
      books: null,
      flat: false,
      outlined: false,
      raised: false
    };
  },
  created() {
    this.books = this.$root.bookData;
  }
};
</script>

<style scoped>
.description {
  font-size: 1.2em;
}
.description p {
  color: white;
}
.description p:last-child {
  font-size: 0.9em;
}
@media screen and (max-width: 960px) {
  .mobile-width {
    width: 100% !important;
    margin-bottom: 10px;
  }
}
</style>