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
      component: () => import("./views/Home.vue")
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
          path: "orderRoom",//订单
          name: "OrderRoom",
          component: () => import("@/views/order/orderRoom")
        },
        {
          path: "verifyIdentity",
          name: "VerifyIdentity",
          component: () => import("@/views/order/verifyIdentity")
        },
        {
          path: "roomType",
          name: "RoomType",
          component: () => import("@/views/order/roomType")
        },
        {
          path: "apartment",
          name: "Apartment",
          component: () => import("@/views/order/apartment")
        },
        {
          path: "markCardOrder",
          name: "MarkCardOrder",
          component: () => import("@/views/order/markCardOrder")
        },
        {
          path: "sceneRoom", //现场
          name: "SceneRoom",
          component: () => import("@/views/scene/sceneRoom")
        },
        {
          path: "checkIn",
          name: "CheckIn",
          component: () => import("@/views/scene/checkIn")
        },
        {
          path: "verifyIdentidy",
          name: "VerifyIdentidy",
          component: () => import("@/views/scene/verifyIdentidy")
        },
        {
          path: "makeCard",
          name: "MakeCard",
          component: () => import("@/views/scene/makeCard")
        },
        {
          path: "groupRoom",//团队
          name: "GroupRoom",
          component: () => import("@/views/group/groupRoom")
        },
        {
          path: "verifyIdentityGP",
          name: "VerifyIdentityGP",
          component: () => import("@/views/group/verifyIdentity")
        },
        {
          path: "roomTypeGP",
          name: "RoomTypeGP",
          component: () => import("@/views/group/roomType")
        },
        {
          path: "apartmentGP",
          name: "ApartmentGP",
          component: () => import("@/views/group/apartment")
        },
        {
          path: "makeCardGP",
          name: "MakeCardGP",
          component: () => import("@/views/group/makeCard")
        },
        {
          path: "continuedRoom",//续房
          name: "ContinuedRoom",
          component: () => import("@/views/continu/continuedRoom")
        },
        {
          path: "markCardContinu",
          name: "MarkCardContinu",
          component: () => import("@/views/continu/markCardContinu")
        },
        {
          path: "checkoutRoom",//退房
          name: "CheckoutRoom",
          component: () => import("@/views/checkout/checkoutRoom")
        },
        {
          path: "techrepublic",//公安验证
          name: "Techrepublic",
          component: () => import("@/views/public/techrepublic")
        },
        {
          path: "verifyPublic",
          name: "VerifyPublic",
          component: () => import("@/views/public/verifyPublic")
        }
      ]
    }
  ]
});
