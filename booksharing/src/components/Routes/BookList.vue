<template>
  <v-container>
    <v-container class="fill-height" fluid v-if="load">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="2" lg="1" class="mobile">
          <breeding-rhombus-spinner
            :animation-duration="750"
            :size="200"
            color="#FF07F8"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-row v-else>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn large v-on="on" class="scroll" @click="scroll">
            <v-icon>arrow_upward</v-icon>
          </v-btn>
        </template>
        <span>Наверх</span>
      </v-tooltip>
      <v-col cols="12">
        <v-row>
          <v-btn @click="refresh" text class="refresh">
            <v-icon class="pr-2">refresh</v-icon>
          </v-btn>
          <v-text-field
            id="top"
            v-model="search"
            label="Поиск книги по названию"
            outlined
            append-icon="search"
          ></v-text-field>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        md="6"
        sm="6"
        lg="4"
        v-for="book in filteredBook"
        :key="book.name"
      >
        <v-card
          class="mx-auto book_card"
          :flat="flat"
          :outlined="outlined"
          :raised="raised"
          :width="width"
          :height="height"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-img
                v-on="on"
                height="100%"
                :src="book.data.img"
                @click="gen_url(book.name)"
                style="cursor: pointer;"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      size="75"
                      class="progress_bar"
                      width="7"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </template>
            <span>{{ book.name }}</span>
          </v-tooltip>
        </v-card>
      </v-col>
      <v-col cols="12">
        <AddBook
          v-if="this.$store.state.auth.userData.name !== undefined"
          @getBook="getNewBooks"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { BreedingRhombusSpinner } from "epic-spinners";
export default {
  metaInfo() {
    return {
      title: `Список книг- ${this.$store.state.appName}`
    };
  },
  components: {
    AddBook: () => import("@/components/Book/AddBook"),
    BreedingRhombusSpinner
  },
  data() {
    return {
      load: true,
      disable: true,
      translit: "",
      search: "",
      books: undefined,
      flat: false,
      outlined: false,
      raised: false,
      width: 550,
      height: 625
    };
  },
  /* eslint-disable*/
  async created() {
    this.books = undefined;
    this.$store.state.book.books = [];
    await this.$store.dispatch("getBooks");
    this.books = this.$store.getters.getBooks;
    this.load = false;
    if (Object.keys(this.$route.query) == "genre") {
      this.disable = false;
      if (this.books === null || this.books === undefined) return null;
      this.books = this.books.filter(book => {
        return book.data.genre
          .toLowerCase()
          .includes(this.$route.query.genre.toLowerCase());
      });
    }
    if (Object.keys(this.$route.query) == "author") {
      this.disable = false;
      if (this.books === null || this.books === undefined) return null;
      this.books = this.books.filter(book => {
        return book.data.author
          .toLowerCase()
          .includes(this.$route.query.author.toLowerCase());
      });
    }
  },
  computed: {
    filteredBook() {
      if (this.books === null || this.books === undefined) return null;
      return this.books.filter(book => {
        return book.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    scroll() {
      document.querySelector("#top").scrollIntoView({
        behavior: "smooth"
      });
    },
    gen_url(name) {
      const chars = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "o",
        ж: "zh",
        з: "z",
        и: "i",
        й: "j",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "sсh",
        ъ: "",
        ы: "i",
        ь: "'",
        э: "e",
        ю: "ju",
        я: "ja"
      };
      var punctuationless = name
        .replace(/[.,/#!$%?^&*;:{}=_`~()"'<>@№+|\]\[\\]/g, "")
        .replace(/[A-Za-z]/g, "");
      const final_text = punctuationless
        .replace(/\s{2,}/g, " ")
        .toLowerCase()
        .split("");
      var result = "";
      for (let i = 0; i < final_text.length; i++) {
        if (final_text[i] == "-") {
          result += "-";
        } else if (parseInt(final_text[i]) || final_text[i] == "0") {
          result += final_text[i];
        } else if (final_text[i] == " ") {
          result += "_";
        } else {
          result += chars[final_text[i]];
        }
      }

      this.$router.push(`book/${result}`);
      const book = this.books.filter(book => {
        return book.name.toLowerCase().includes(name.toLowerCase());
      });
      this.$store.dispatch("currentBook", book);
    },
    getNewBooks() {
      this.$router.go();
    },
    refresh() {
      if (this.disable != true) {
        this.$router.replace({ query: null });
      }
      this.$router.go();
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

html {
  scroll-behavior: smooth;
}
.refresh {
  margin-top: 0.75em;
  &::after {
    content: "Обновить книги";
  }
  @media screen and (max-width: 400px) {
    &::after {
      content: "";
    }
  }
}
.scroll {
  z-index: 99;
  position: fixed;
  bottom: 1%;
  left: 3%;
  background-color: $main-color !important;
  & i {
    font-size: 3em;
  }
  @media screen and (max-width: 400px) {
    left: 0;
    bottom: 0;
    & i {
      font-size: 2.65em;
    }
  }
  @media screen and (min-width: 1600px) {
    left: 0;
  }
}
.mobile {
  padding-top: 10%;
  @media screen and (max-width: 400px) {
    padding-left: 23%;
    padding-top: 45%;
  }
  @media screen and (max-width: 700px) {
    padding-top: 45%;
  }
}
.book_card {
  margin-bottom: 5px;
  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 35px 0 darken($main-color, 25%);
  }
  .progress_bar {
    color: $main-color !important;
  }
  @media screen and (min-width: 1600px) {
    height: 850px !important;
  }
}
</style>
