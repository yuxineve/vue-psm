<!--现场订房-->
<template>
  <div id="SceneRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>请点击意向房型， 里面有信息</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="roomType">
      <div v-for="(item,index) in roomType" class="roomBorder" @click="handleRoomType(item)" :key="index">
        <div class="roomPhoto">
          <label v-if="!item.canRes">
            <span class="fullText">满房</span>
            <div class="fullRoom"></div>
          </label>
          <img :src="item.imgName" />
        </div>
        <div class="priceBottom">
          <span>{{item.roomType}}</span>
          <span>{{item.todayPrice}}/天</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';

import Vue from "vue"
import DisclaimerContent from "@/components/Content"
import StepTips from "@/components/StepTips"
import { Button, Message } from "element-ui"

Vue.use(Button);

export default {
  name: 'SceneRoom',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      roomType:[],
    }
  },
  created () {
    const that = this;
    this.$store.commit("changeStatus", false);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 0) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    this.VueAxios(this.ServeApi.getTotleRTScene,'')
    .then(res => {
      if(res.code == 200){
        that.roomType = res.data;
      }else{
        Message({
          message: res.msg,
          type: 'warning'
        });
      }
    })
  },
  methods: {
    handleRoomType(item){
      if(item.canRes){
        this.$router.push({path:"CheckIn",query:{id: item.roomTypeId}});
      }else{
        Message({
          message: "您选择的房型，今日已满房，请选择其他房型！",
          type: 'warning'
        });
      }
    }
  },
  components: { DisclaimerContent, StepTips}
}
</script>

<style lang="less">
#SceneRoom {
  .leftTips{
    margin-top:156px;
  }
  .roomType{
    width: 756px;//753
    height: 420px;//408
    position: absolute;
    bottom: 40px;
    right:20px;
    overflow-x:hidden;
    overflow-y: auto; 
    .roomPhoto{
      position:relative;
      width:220px;
      height:140px;
      border-radius:10px;
      overflow: hidden;
      .fullRoom {
        position: absolute;
        width: 0;
        height: 0;
        border: 70px solid;
        border-color: transparent transparent transparent #a0d56d;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        top: -72px;
        right: -72px;
      }
      .fullText {
        position: absolute;
        font-size:18px;
        color:#EEEEEE;
        right: 12px;
        top:12px;
        z-index: 7;
        transform: rotate(45deg);
      }
      img{
        width: 220px;
        height: 140px;
      }
    }
  }
  .roomBorder{
    width: 220px;
    height:188px;
    border-radius: 10px;
    // opacity:0.4;
    border: 1px solid #F39800;
    float: left;
    margin:32px 24px 0 0;
    background: rgba(3, 231, 231, 0.25);
    .priceBottom{
      width: 176px;
      height:32px;
      background:rgba(3, 231, 231, 0.4);
      border-radius: 5px;
      margin: 8px 16px;
      line-height: 32px;
      color: #F39800;
      font-size:16px;
      padding:0 6px;
      span:nth-child(1){
        float: left;
      }
      span:nth-child(2){
        float:right;
      }
    }
  }
  .roomBorder:nth-child(-n+3){
    margin-top: 0!important;
  }
}
</style>
