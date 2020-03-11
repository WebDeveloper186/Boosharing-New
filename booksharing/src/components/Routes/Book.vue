<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            class="mx-auto book_img"
            width="100%"
            height="100%"
            lazy-src="https://psv4.userapi.com/c856328/u253906204/docs/d16/367d998fb54a/Bez_imeni-1.png?extra=qhm0pFmADRI6fhsx-A74x3QQNfIvpBRAIIWtO5pgeP4PTNLat_FPwqI7DIGypnS6_OkyHWGpUWU1hbEdwxS21gDJZWNFRoptHm1as8Tv0dTWw1Rw-vkbklhlTsk4yQ2lA9Yo8cOGry8Vxc2beBb_Rm7s"
            :src="books[0].data.img"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate size="75" class="progress_bar" width="7"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            class="mx-auto mobile-width book_info"
            :flat="flat"
            :outlined="outlined"
            :raised="raised"
            height="100%"
          >
            <v-card-title>
              <v-spacer></v-spacer>Описание книги
              <v-spacer></v-spacer>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="description">
              <p>
                <b class="uppercase">Название:</b>
                {{ books[0].name }}
              </p>
              <p>
                <b class="uppercase">Автор:</b>
                <v-chip
                  v-for="author in authors"
                  :key="author"
                  :outlined="true"
                  small
                  class="authors"
                  @click="$router.push(`/books?author=${author}`)"
                >
                  <v-icon left>create</v-icon>
                  {{ author }}
                </v-chip>
              </p>
              <p>
                <b class="uppercase">Владелец:</b>
                <v-chip
                  v-for="owner in books[0].data.owners"
                  :key="owner.name"
                  class="owner"
                  :outlined="true"
                  pill
                  small
                >
                  <v-icon left>mdi-account</v-icon>
                  {{ owner.name }}
                </v-chip>
              </p>
              <p>
                Жанр:
                <v-chip
                  v-for="genre in genres"
                  :key="genre"
                  class="genres"
                  :outlined="true"
                  small
                  @click="$router.push(`/books?genre=${genre}`)"
                >
                  <v-icon left>import_contacts</v-icon>
                  {{ genre }}
                </v-chip>
              </p>
              <p>
                <b class="uppercase">Краткое описание:</b>
                {{ books[0].data.short_description }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="order_btn">Заказать книгу</v-btn>
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
      genres: null,
      authors: null,
      flat: false,
      outlined: false,
      raised: false
    };
  },
  created() {
    this.books = this.$store.getters.getCurrentBook;
    this.genres = this.books[0].data.genre.split(",");
    this.authors = this.books[0].data.author.split(",");
    console.log(this.authors);
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

* {
  color: black;
}
.book_img {
  border-radius: 15px;
  height: 625px !important;
  margin-left: 30px !important;
  .progress_bar {
    color: $main-color;
  }
  @media screen and (min-width: 1600px) {
    height: 825px !important;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
}
.book_info {
  border-radius: 15px !important;
  width: 55%;
  height: 100%;
  background-image: url("/book_info.jpg");
  background-position: center;
  .description {
    font-size: 1.2em;
    p:last-child {
      font-size: 0.9em;
    }
    .authors {
      margin-bottom: 5px;
      color: $author;
      border-color: $author;
    }
    .owner {
      margin-bottom: 10px;
      color: $owner;
      border-color: $owner;
    }
    .genres {
      margin-bottom: 5px;
      color: $genre;
      border-color: $genre;
    }
    .uppercase {
      text-transform: uppercase;
    }
  }
  .order_btn {
    background-color: $main-color !important;
    border-color: $main-color !important;
    @media screen and (max-width: 500px) {
      margin-top: -35px !important;
    }
  }
  @media screen and (max-width: 500px) {
    padding-top: -35px !important;
  }
}
.mobile-width {
  @media screen and (max-width: 960px) {
    width: 100% !important;
    margin-bottom: 10px;
  }
}
</style>
