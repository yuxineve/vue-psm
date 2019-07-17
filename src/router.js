import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("./views/home.vue")
    },
    {
      path: "/child",
      name: "Child",
      component: () => import("@/views/Child.vue")
    },
    {
      path: "/index",
      name: "Index",
      components:{
        default:() => import("@/views/index.vue"),
        timeOut:() => import('@/components/TimeOut.vue')
      },
      children: [{
          path: "",
          component: () => import("@/views/pageIntro")
        },{
          path: "content",
          name: "Content",
          component: () => import("@/views/Content")
      }]
    }
  ]
});
