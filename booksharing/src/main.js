import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import Meta from "vue-meta";

import * as firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  //firebase config
};
firebase.initializeApp(firebaseConfig);

let app;

Vue.use(Meta, {
  refreshOnceOnNavigation: true
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
