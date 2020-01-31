import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import Meta from "vue-meta"

import * as firebase from "firebase";

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDgfYwBBK3pBW7Sq5LyKUeQyr9cMqllVvI",
  authDomain: "booksharing-a15d7.firebaseapp.com",
  databaseURL: "https://booksharing-a15d7.firebaseio.com",
  projectId: "booksharing-a15d7",
  storageBucket: "booksharing-a15d7.appspot.com",
  messagingSenderId: "325300886438",
  appId: "1:325300886438:web:7c1e65f0ac25a8ded00d67",
  measurementId: "G-4ZH82LRX52"
};
firebase.initializeApp(firebaseConfig)

let app

Vue.use(Meta, {
  refreshOnceOnNavigation: true
})

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})