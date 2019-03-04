import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Recommend from "./views/Recommend.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/Home"
    },
    {
      path: "/Home",
      component: Home
    },
    {
      path: "/Recommend",
      component: Recommend
    }
  ]
});
