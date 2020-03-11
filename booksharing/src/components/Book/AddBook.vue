<template>
  <v-row justify="center">
    <v-btn class="login" tile color="purple" @click="show">
      <v-icon left>book</v-icon>Добавить книгу
    </v-btn>
    <modal name="demo-login" transition="pop-out" :width="modalWidth" :height="550">
      <div class="box">
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title">Новая книга</div>
            <div class="partition-form">
              <v-text-field v-model="title" label="Название книги"></v-text-field>
              <v-text-field v-model="author" label="Автор"></v-text-field>
              <v-text-field v-model="genre" label="Жанр"></v-text-field>
              <v-text-field v-model="img" label="Ссылка на обложку"></v-text-field>
              <v-textarea
                outlined
                no-resize
                height="125"
                :counter="1550"
                v-model="short_descrtiption"
                label="Краткое описание"
              ></v-textarea>

              <div class="button-set">
                <v-row>
                  <v-btn class="first_btn" :disabled="disabled" @click="add">Добавить</v-btn>
                  <v-btn class="second_btn" @click="cancel">Отменить</v-btn>
                </v-row>
              </div>
            </div>
          </div>
        </div>
        <div class="box-part" id="bp-right"></div>
      </div>
    </modal>
  </v-row>
</template>

<script>
/*eslint-disable*/
const MODAL_WIDTH = 656;
export default {
  data() {
    return {
      modalWidth: MODAL_WIDTH,
      title: "",
      author: "",
      genre: "",
      img: "",
      short_descrtiption: ""
    };
  },
  computed: {
    disabled: function() {
      if (
        this.title == "" ||
        this.author == "" ||
        this.short_descrtiption == "" ||
        this.short_descrtiption.length > 1550 ||
        this.genre == ""
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  },
  methods: {
    show() {
      this.$modal.show("demo-login");
    },
    async add() {
      if (this.img == "") {
        this.img =
          "https://sun9-63.userapi.com/c857536/v857536112/16621e/djI7yAEolLg.jpg";
      }
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
      this.$modal.hide("demo-login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_mixins.scss";
@import "@/styles/_variables.scss";

.box {
  background: $bg-modal;
  overflow: hidden;
  @include width-and-height(660px, 550px);
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    @include width-and-height(50%, 100%);
    &#bp-right {
      background: url("https://vnnews.ru/images/wsscontent/articles/2015/12/semya-mitinykh-dlya-nas-kniga-eto-svyatoe.jpg")
        no-repeat center;
      border-left: 1px solid #eee;
    }
  }
  .partition {
    @include width-and-height(100%, 100%);
    .partition-title {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }

    .button-set {
      margin-left: 15px;
      .first_btn {
        color: white;
        width: 45%;
        background-color: $main-color !important;
        border-color: $main-color !important;
      }
      .second_btn {
        color: white;
        width: 45%;
        margin-left: 5%;
        background-color: $second-color !important;
        border-color: $second-color !important;
      }
    }
  }
  button {
    border-radius: 10px;
    font-family: "Open Sans", sans-serif;
    margin-top: 8px;
    text-transform: uppercase;
    font-size: 11px;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>
