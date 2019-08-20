<!--公安验证-->
<template>
  <div id="Techrepublic" class="contentView">
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
      <div class="orderDetail">
        <p>订单详情</p>
        <img :src="orderImg" />
        <span>
          <label :class="{borderColor:isReadCardSuccess}">房型：{{roomType}}</label>
          <label :class="{borderColor:isReadCardSuccess}">房间：{{roomNum}}</label>
        </span>
      </div>
      <div class="btn">
        <button :disabled="!isReadCardSuccess" @click="confirm" :class="{sureBtn:isReadCardSuccess}">确认办理</button>
        <button :disabled="!isReadCardSuccess" @click="cancel" :class="{cancelBtn:isReadCardSuccess}">取消办理</button>
      </div>
    </div>
    <span>
      <el-button type="success" @click="readSuccess" >读卡成功</el-button>
      <el-button type="success" @click="readFailure">读卡失败</el-button>
    </span>
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
  name: 'Techrepublic',
  data () {
    return {
      siteStepText:this.$store.state.publicStepTextState,
      leftTips:'',
      roomCardImg:require("@/assets/images/insertCard.gif"),
      orderImg:require("@/assets/images/orderImg.png"),
      roomType:'***',
      roomNum:'***',
      isReadCardSuccess:false,//是否读卡成功
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏下一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 0) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
  },
  methods: {
    confirm(){
      this.$router.push('verifyPublic');
    },
    cancel(){
      this.$router.push('/home');
    },
    readSuccess(){//读卡成功
      this.roomCardImg = require("../../assets/images/readCardSuccess.png");
      this.orderImg = require("@/assets/images/1.jpg");
      this.isReadCardSuccess = true;
      this.roomType = '大嘴猴';
      this.roomNum = "4562";
    },
    readFailure(){
      this.roomCardImg = require("../../assets/images/cardDefeated.png");
      this.leftTips = '读卡失败,请取走房卡,并移步到前台咨询或办理';
      this.isReadCardSuccess = false;
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: {StepTips, DisclaimerContent }
}
</script>

<style lang="less">
#Techrepublic {
  .content{
    width:660px;
    height:310px;
    margin:158px 0 0 68px;
    float: left;
    .roomCard,.orderDetail{
      width:190px;
      height:300px;
      background:rgba(3, 231, 231, 0.4);
      border-radius:14px;
      border:1px solid rgba(243,152,0, 0.4);
      margin-right:58px;
      float: left;
      padding:0 15px;
      > p{
        color: #F8F9FB;
        font-size:20px;
        text-align: center;
        margin:16px 0
      }
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
      > span{
        display:inline-block;
        margin:10px 34px;
        label{ 
          display:inline-block;
          width:112px;
          height:26px;
          line-height:26px;
          border:1px solid #666666;
          font-size:12px;
          border-radius:6px;
          padding:0 0 0 8px;
          margin-top:10px;
          color: #8E8E90;
        }
        .borderColor{
          border:1px solid #03D4E7;
          color:#FAFAFB;
        }
      }
    }
    .btn{
      margin-top:136px;
      width:90px;
      float: left;
      > button{
        width:84px;
        height:30px;
        border-radius:7px;
        border: 1px solid #666;
        color:#8E8E90;
        font-size:14px;
        background:none;
        margin-top:18px;
        cursor: not-allowed;
        float: left;
      }
      >button:first-child{
        background:#666;
      }
      .sureBtn{
        cursor: pointer;
        background:#F39800!important;
        border: 1px solid #F39800;
        color: #013F3D;
      }
      .cancelBtn{
        cursor: pointer;
        color: #FAFAFB;
        border:1px solid #F39800;
      }
    }
  }
}
</style>
