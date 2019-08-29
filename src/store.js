import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 120,
    seenGoBack: true,
    seenHome: false,
    timeOutSrc:'',//延时icon
    IsDisclaiDisplay: true,//展示免责
    orderStepTextState:[{//订单取房
      text:'查询订单',
      num:'01',
      selectClass:true,
    },{
      text:'验证身份',
      num:'02',
      selectClass:false,
    },{
      text:'支付费用',
      num:'03',
      selectClass:false,
    },{
      text:'制作房卡',
      num:'04',
      selectClass:false,
    }],
    siteStepTextState: [{//现场入住step
        text: "选择房型",
        num: "01",
        selectClass: true
      },{
        text: "办理入住",
        num: "02",
        selectClass: false
      },{
        text: "验证身份",
        num: "03",
        selectClass: false
      },{
        text: "支付费用",
        num: "04",
        selectClass: false
      },{
        text: "制作房卡",
        num: "05",
        selectClass: false
      }
    ],
    outStepTextState:[{//退房
      text:'办理退房',
      num:'01',
      selectClass:true,
    }],
    continuStepTextState:[{//续房
      text:'查找房间',
      num:'01',
      selectClass:true,
    },{
      text:'支付费用',
      num:'02',
      selectClass:false,
    },{
      text:'制作房卡',
      num:'03',
      selectClass:false,
    }],
    publicStepTextState:[{//公安
      text:'读取房卡',
      num:'01',
      selectClass:true,
    },{
      text:'验证身份',
      num:'02',
      selectClass:false,
    }]
  },
  mutations: {
    decrease(state) {
      state.count--;
      if(state.count == 20){
          state.timeOutSrc = require("@/assets/images/timeOut.gif");
      }else if(state.count > 20){
        state.timeOutSrc = '';
      }
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
    },
  },
  actions: {}
});
