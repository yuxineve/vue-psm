<!--退房-->
<template>
  <div id="CheckoutRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="cardContent">
      <div class="readCard">
        <p>{{cardTips}}</p>
        <img :src="cardImg">
      </div>
      <div class="orderDetail">
        <p>订单详情</p>
        <img :src="orderImg" />
        <span>
          <label :class="{colorBorder:!isDisabled}" >姓名：{{name}}</label>
          <label :class="{colorBorder:!isDisabled}" >房型：{{roomType}}</label>
          <label :class="{colorBorder:!isDisabled}" >房间：{{room}}</label>
        </span>
      </div>
      <span class="btn">
        <button class="sure" :class="{canClick:!isDisabled}" :disabled="isDisabled" @click="sureCheckOut">确定退房</button>
        <button class="cancel" :class="{canClick:!isDisabled}" :disabled="isDisabled" @click="cancelCheckOut">取消退房</button>
      </span>
      <span v-if="!config.IsValid" style="display:flex">
        <el-button type="success" @click="readCard">读卡成功</el-button>
        <el-button type="success" @click="failure">读卡失败</el-button>
      </span>
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
  name: 'CheckoutRoom',
  data () {
    return {
      siteStepText:this.$store.state.outStepTextState,
      config:cfg,
      leftTips:'',
      cardTips:'请插入房卡',
      cardImg:require("@/assets/images/insertCard.gif"),
      orderImg:require("@/assets/images/orderImg.png"),
      name:'***',
      roomType:'****',
      room:'***',
      isDisabled:true,//是否可以点击按钮，true：不展示订单详情
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    sureCheckOut(){//确认退房
      console.log(1);
    }, 
    cancelCheckOut(){
      this.$router.push('/home');
    },
    readCard(){
      this.cardImg = require("@/assets/images/readCardSuccess.png");
      this.orderImg = require("@/assets/images/login.jpg");
      this.isDisabled = false;
    },
    failure(){//读卡失败
      this.cardImg = require("@/assets/images/cardDefeated.png")
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips, DisclaimerContent }
}
</script>

<style lang="less">
#CheckoutRoom {
  .cardContent{
    width:680px;
    height:310px;
    float: left;
    margin:158px 0 0 60px;
    > div{
      width:190px;
      height:300px;
      float: left;
      background:rgba(3, 231, 231, 0.4);
      border-radius:14px;
      border: 1px solid rgba(243,152,0, 0.4);
      margin-right:40px;
      padding:0 15px;
      color: #F8F9FB;
      > p{
        font-size:20px;
        text-align: center;
        margin:16px 0;
      }
    }
    .readCard{
      > img{
        width:190px;
        height:218px;
      }
    }
    .orderDetail{
      > img{
        width:190px;
        height:114px;
      }
      >span{
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
        .colorBorder{
          border:1px solid #03D4E7;
          color: #FAFAFB;
        }
      }
    }
    .btn{
      margin-top: 150px;
      display:inline-block;
      width:90px;
      > button{
        float: left;
        width:84px;
        height:30px;
        line-height:30px;
        border-radius:7px;
        text-align:center;
        border:1px solid #666;
        font-size:14px;   
        color: #8E8E90;
        margin-bottom:18px;
        cursor: not-allowed;//
      }
      .sure{
        background:#666;
      }
      .cancel{
        background:none;
      }
      .canClick{
        cursor: pointer;
        border:1px solid #F39800;
        color: #FAFAFB;
      }
      .canClick:first-child{
        background:#F39800;
        color: #013F3D;
      }
    }
  }
}
</style>
