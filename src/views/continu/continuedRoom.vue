<!--续房-->
<template>
  <div id="ContinuedRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="content">
      <div class="roomCard">
        <p>请插入房卡</p>
        <img :src="roomCardImg" />
      </div>
      <div class="priceOrder">
        <p>价格详情</p>
        <img :src="priceImg" />
      </div>
      <div class="btn">
        <button>确认续住</button>
        <button>取消续住</button>
      </div>
      <div class="orderDetail">
        <p>订单详情</p>
        <img :src="orderImg" />
        <span>
          <label>姓名：{{name}}</label>
          <label>房型：{{roomType}}</label>
          <label>房间：{{roomNum}}</label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import StepTips from "@/components/StepTips"
import DisclaimerContent from "@/components/Content"
import { Button } from "element-ui"
import cfg from "@/config/index.js"
import common from "@/utils/common.js"
import '@/assets/style/common.less';

Vue.use(Button);

export default {
  name: 'ContinuedRoom',
  data () {
    return {
      siteStepText:this.$store.state.continuStepTextState,
      leftTips:'',
      roomCardImg:require("@/assets/images/insertCard.gif"), 
      priceImg:require("@/assets/images/loadRead.gif"),
      orderImg:require("@/assets/images/orderImg.png"),
      name:'***',
      roomType:'***',
      roomNum:'***',
    }
  },
  created () {
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips, DisclaimerContent }
}
</script>

<style lang="less">
#ContinuedRoom {
  .content{
    width:810px;
    height:310px;
    float: left;
    margin-top:158px;
    > .orderDetail,.priceOrder,.roomCard{
      width:190px;
      height:300px;
      float: left;
      border:1px solid rgba(243,152,0, 0.4);
      background:rgba(3, 231, 231, 0.4);
      border-radius:14px;
      margin-left:16px;
      padding:0 15px;
      > p{
        font-size:20px;
        color: #F8F9FB;
        text-align:center;
        margin:16px 0;
      }
      > img{
        width:190px;
        height:218px;
      }
    }
    .orderDetail{
      > img{
        height:114px;
      }
      > span{
        display:inline-block;
        margin:4px 34px;
        label{ 
          display:inline-block;
          width:112px;
          height:26px;
          line-height:26px;
          border:1px solid #666666;
          font-size:12px;
          border-radius:6px;
          padding:0 0 0 8px;
          margin-top:6px;
          color: #8E8E90;
        }
      }
    }
    .btn{
      float:left;
      width:90px;
      margin-top:100px;
      > button{
        float: left;
        width:88px;
        height:30px;
        color: #8E8E90;
        border-radius:7px;
        margin:14px 12px 0 12px;
        background:none;
        border:1px solid #666;
        cursor: pointer;
      }
      > button:first-child{
        background:#666;
      }
    }
  }
}
</style>
