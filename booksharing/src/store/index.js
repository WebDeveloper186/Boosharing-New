import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import book from './book'

Vue.use(Vuex)

/*eslint-disable*/
export default new Vuex.Store({
  state: {
    appName: "Booksharing",
    drawer: false,
    links: [{
      name: "Главная",
      link: "/",
      icon: "dashboard"
    }, {
      name: "Книги",
      link: "books",
      icon: "book"
    }, ]
  },
  getters: {
    getLinks: state => {
      return state.links
    },
    getDrawer: state => {
      return state.drawer
    }
  },
  actions: {
    changeDrawer({
      dispatch,
      commit
    }, data) {
      commit("setDrawer", data)
    }
  },
  mutations: {
    setDrawer(state, data) {
      state.drawer = data
    }
  },
  modules: {
    auth,
    book
  }
})