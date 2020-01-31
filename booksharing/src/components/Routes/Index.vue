<template>
  <v-col>
    <section style="margin: -12px;">
      <v-parallax
        src="https://images.wallpaperscraft.ru/image/svetilniki_knigi_biblioteka_73969_1920x1080.jpg"
        height="600"
      >
        <v-layout column align-center justify-center class="white--text">
          <img
            src="https://psv4.userapi.com/c856532/u253906204/docs/d1/b93c12bdf205/Books_are_shared.png?extra=51W8EkGGLHcZIo6wsYPbByMoC1vMPtHTRb5_9CKCBrnXsJlIhiSLPD1Bf1GFK07AVo2sBl9HY2XhqHqYOq7DGJDrYdcdK1KDqfNxgGX8apMuLSitc8Bu3B-BGEWfAGR695ONnzcarcv21PDx5Sw1Wn8-"
            alt="Books are shared"
            height="200"
          />
          <h1 class="white--text mb-2 display-1 text-center">Booksharing</h1>
          <div class="subheading mb-4 text-center">Developed by xX_flex_Xx</div>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout column wrap class="my-12" align-center>
        <v-flex xs12 sm4 class="my-4">
          <div class="text-center">
            <h2 class="headline">Лучший способ начать читать желанную книгу прямо сейчас</h2>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">book</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Обширный список книг</div>
                  </v-card-title>
                  <v-card-text>
                    Здесь должна была быть информация о списке книг и о том, как
                    их много. Но главному frontend разработчику слишком мало
                    заплатили и поэтому её здесь нет.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">speed</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Быстрое получение книги</div>
                  </v-card-title>
                  <v-card-text>
                    Здесь должна была быть информация о получении книг. Но
                    главному frontend разработчику слишком мало заплатили и
                    поэтому её здесь нет.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card flat class="transparent">
                  <v-card-text class="text-center">
                    <v-icon x-large class="blue--text text--lighten-2">people</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-center">Обширное сообщество</div>
                  </v-card-title>
                  <v-card-text>
                    Здесь должна была быть информация о сообществе любителей
                    книг. Но главному frontend разработчику слишком мало
                    заплатили и поэтому её здесь нет.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section style="margin-left: -12px; margin-right: -12px">
      <v-lazy
        v-model="paralax"
        :options="{
          threshold: 0.5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-parallax
          src="https://images.wallpaperscraft.ru/image/svetilniki_knigi_biblioteka_73969_1920x1080.jpg"
          height="380"
        >
          <v-layout column align-center justify-center>
            <div
              class="headline white--text mb-4 text-center"
            >Получить желаемую книгу легче, чем ты думаешь</div>
            <em>Начни пользоватся приложением уже сегодня</em>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              @click="$router.push('books')"
            >Посмотреть список книг</v-btn>
          </v-layout>
        </v-parallax>
      </v-lazy>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-lazy
          v-model="info"
          :options="{
            threshold: 0.75
          }"
          min-height="200"
          transition="slide-x-transition"
        >
          <v-layout row wrap justify-center class="my-12">
            <v-flex xs12 sm4>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Информация о проекте</div>
                </v-card-title>
                <v-card-text>
                  Здесь должна была быть информация о проекте "Booksharing". Но
                  главному frontend разработчику слишком мало заплатили и
                  поэтому её здесь нет.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card flat class="transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Наши контакты</div>
                </v-card-title>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>8(800)555-35-35</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Сургут, Россия</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>xX_flex_Xx@gmail.com</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-lazy>
      </v-container>
    </section>
  </v-col>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: `Главная - ${this.$store.state.appName}`
    };
  },
  data() {
    return {
      paralax: false,
      info: false
    };
  }
};
</script>
