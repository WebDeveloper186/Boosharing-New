<template>
  <v-row justify="center">
    <v-menu v-model="book" :close-on-content-click="false" max-width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="purple" class="ma-2" large v-on="on">Добавить книгу</v-btn>
      </template>

      <v-col cols="12" md="10" lg="12" sm="6">
        <v-card>
          <v-list>
            <v-list-item class="ml-4">Добавление книги</v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="title" label="Навзвание книги"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="author" label="Автор книги"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="genre" label="Основной жанр книги"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="img" label="Ссылка на обложку книги"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-text-field v-model="short_descrtiption" label="Краткое описание"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="book = !book">Отмена</v-btn>
            <v-btn color="purple" text @click="add">Добавить</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-menu>
  </v-row>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    return {
      book: false,
      title: "",
      author: "",
      genre: "",
      img: "",
      short_descrtiption: ""
    };
  },
  methods: {
    async add() {
      const formData = {
        title: this.title,
        author: this.author,
        img: this.img,
        short_description: this.short_descrtiption,
        genre: this.genre,
        owners: [
          {
            name: this.$store.state.auth.userData.name
          }
        ]
      };
      try {
        await this.$store.dispatch("addBook", formData);
        this.book = false;
        this.$store.state.book.books = [];
        await this.$store.dispatch("getBooks");
        this.$emit("getBook");
      } catch (error) {
        throw error;
      }
    },
    cancel() {
      this.title = "";
      this.author = "";
      this.genre = "";
      this.img = "";
      this.short_descrtiption = "";
      this.book = !this.book;
    }
  }
};
</script>

<style scoped>
</style>