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
      components: {
        default: () => import("@/views/index.vue"),
        timeOut: () => import("@/components/TimeOut.vue")
      },
      children: [
        {
          path: "",
          component: () => import("@/views/pageIntro")
        },
        {
          path: "orderRoom",
          name: "OrderRoom",
          component: () => import("@/views/order/orderRoom")
        },
        {
          path: "sceneRoom",
          name: "SceneRoom",
          component: () => import("@/views/scene/sceneRoom")
        },
        {
          path: "checkIn",
          name: "CheckIn",
          component: () => import("@/views/scene/checkIn")
        },
        {
          path: "groupRoom",
          name: "GroupRoom",
          component: () => import("@/views/group/groupRoom")
        },
        {
          path: "continuedRoom",
          name: "ContinuedRoom",
          component: () => import("@/views/continu/continuedRoom")
        },
        {
          path: "checkoutRoom",
          name: "CheckoutRoom",
          component: () => import("@/views/checkout/checkoutRoom")
        },
        {
          path: "techrepublic",
          name: "Techrepublic",
          component: () => import("@/views/public/techrepublic")
        }
      ]
    }
  ]
});
