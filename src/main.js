import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueAxios, LocalAxios } from "./utils/api.js";
import ServeApi from "@/utils/serveApi.js";

Vue.prototype.VueAxios = VueAxios
Vue.prototype.LocalAxios = LocalAxios
Vue.prototype.ServeApi = ServeApi
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
