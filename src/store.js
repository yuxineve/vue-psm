import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 120,
    seenGoBack: true,
    seenHome: false,
    siteStepTextState: [
      {
        text: "选择房型",
        num: "01"
      },
      {
        text: "办理入住",
        num: "02"
      },
      {
        text: "验证身份",
        num: "03"
      },
      {
        text: "支付费用",
        num: "04"
      },
      {
        text: "制作房卡",
        num: "05"
      }
    ]
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
    },
    changeHomeStatus(state, flag) {
      state.seenHome = flag;
    }
  },
  actions: {}
});
