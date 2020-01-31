<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-btn large @click="$router.go()">Весь список книг</v-btn>
          <v-text-field
            v-model="search"
            label="Поиск книги по названию"
            outlined
            append-icon="search"
          ></v-text-field>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" sm="6" lg="4" v-for="book in filteredBook" :key="book.name">
        <v-card
          class="mx-auto"
          :flat="flat"
          :outlined="outlined"
          :raised="raised"
          :width="width"
          :height="height"
          style="border-radius: 10px"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-img
                v-on="on"
                height="100%"
                :src="book.data.img"
                style="cursor:pointer"
                @click="gen_url(book.name)"
              ></v-img>
            </template>
            <span>{{book.name}}</span>
          </v-tooltip>
        </v-card>
      </v-col>
      <v-col cols="12">
        <AddBook v-if="this.$store.state.auth.userData.name !== undefined" @getBook="getNewBooks" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddBook from "@/components/Book/AddBook";
export default {
  metaInfo() {
    return {
      title: `Список книг- ${this.$store.state.appName}`
    };
  },
  components: {
    AddBook
  },
  data() {
    return {
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
    if (Object.keys(this.$route.query) == "genre") {
      if (this.books === null || this.books === undefined) return null;
      this.books = this.books.filter(book => {
        return book.data.genre
          .toLowerCase()
          .includes(this.$route.query.genre.toLowerCase());
      });
    }
    if (Object.keys(this.$route.query) == "author") {
      if (this.books === null || this.books === undefined) return null;
      this.books = this.books.filter(book => {
        return book.data.author
          .toLowerCase()
          .includes(this.$route.query.author.toLowerCase());
      });
    }
  },
  watch: {
    search() {
      console.log(this.search);
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
      this.$root.bookData = book;
    },
    getNewBooks() {
      this.$router.go();
    }
  }
};
</script>
