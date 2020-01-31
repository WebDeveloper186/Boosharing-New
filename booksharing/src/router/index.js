import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

Vue.use(Router);
Vue.use(Meta);

/* eslint-disable*/

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      component: () => import("@/components/Routes/Index")
    },
    {
      path: "/books",
      component: () => import("@/components/Routes/BookList")
    },
    {
      path: "/user",
      component: () => import("@/components/Routes/User")
    },
    {
      path: "/book/:id",
      component: () => import("@/components/Routes/Book"),
      beforeEnter(to, from, next) {
        if (from.path !== "/books") {
          next("/books");
        } else {
          next();
        }
      }
    }
  ]
});