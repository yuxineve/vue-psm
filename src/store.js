import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 120,
    seenGoBack: true
  },
  mutations: {
    decrease(state) {
      state.count--;
    },
    init(state, n) {
      state.count = n;
    },
    changeStatus(state, flag) {
      state.seenGoBack = flag;
    }
  },
  actions: {}
});
