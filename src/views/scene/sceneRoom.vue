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
      <div v-for="(item,index) in roomType" class="roomBorder" :key="index">
        <router-link :to="{ name: 'CheckIn', query:{id: item.id}}">
          <div class="roomPhoto"><img :src="item.img" />></div>
          <div class="priceBottom">
            <span>{{item.title}}</span>
            <span>{{item.price}}/天</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';

import Vue from "vue"
import DisclaimerContent from "@/components/Content"
import StepTips from "@/components/StepTips"
import { Button } from "element-ui"

Vue.use(Button);

export default {
  name: 'SceneRoom',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      roomType:[{
        title:'标准主题房',
        img:require("@/assets/images/login.jpg"),
        price:'100',
        id:1,
      },{
        title:'标准主题房',
        img:require("@/assets/images/adImgLevel-2/ad1.jpg"),
        price:'100',
        id:2,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:3
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:4
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:5,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:6,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:7,
      }]
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      if(key <= 0){
        val.selectClass = true;
      }else{
        val.selectClass = false;
      }
      return val;
    });
    this.VueAxios(this.ServeApi.getTotleRTScene,'')
    .then(res => {
      console.log(res);
    })
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
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
      width:220px;
      height:140px;
      border-radius:10px;
      overflow: hidden;
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
