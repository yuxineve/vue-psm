import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 120,
    seenGoBack: true,
    seenHome: false,
    IsDisclaiDisplay: true,//展示免责
    siteStepTextState: [
      //现场入住step
      {
        text: "选择房型",
        num: "01",
        selectClass: true
      },
      {
        text: "办理入住",
        num: "02",
        selectClass: false
      },
      {
        text: "验证身份",
        num: "03",
        selectClass: false
      },
      {
        text: "支付费用",
        num: "04",
        selectClass: false
      },
      {
        text: "制作房卡",
        num: "05",
        selectClass: false
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
    },
    changeDisclai(state,flag) {
      state.IsDisclaiDisplay = flag;
    }
  },
  actions: {}
});
