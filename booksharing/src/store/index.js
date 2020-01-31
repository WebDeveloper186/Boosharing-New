import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import book from './book'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: "Booksharing",
    links: [{
      name: "Книги",
      link: "books",
      icon: "mdi-book"
    }]
  },
  getters: {
    getLinks: s => {
      return s.links
    }
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    book
  }
})