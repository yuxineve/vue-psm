<!--订单取房-->
<template>
  <div id="OrderRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span></span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="findorder">
      <div class="orderType">
        <ul>
          <li :class="{selectBg:isSelectBg}" @click="searchByName()">姓名查询</li>
          <li :class="{selectBg:!isSelectBg}" @click="searchByID()">身份证查询</li>
        </ul>
      </div>
      <div class="searchOrder" v-if="isSelectBg">
        <img src="../../assets/images/searchIcon.png" />
        <div class="Keyborad clearfix">
          <Keyborad :placeholder="placeholder" @getSearchValue="getSearchValue"></Keyborad>
        </div>
      </div>
      <div class="searchIdCard" v-else>
        <div>
          <p>请扫描身份证</p>
          <img src="../../assets/images/idCard.gif" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import StepTips from "@/components/StepTips"
import DisclaimerContent from "@/components/Content"
import Keyborad from '@/components/vitualKeyboard/Keyboard'
import { Button } from "element-ui"
import '@/assets/style/common.less';

Vue.use(Button);

export default {
  name: 'OrderRoom',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
      placeholder:'请填写预订时预留的姓名',
      isSelectBg:true,//true显示姓名查询，false显示身份证查询，
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    getSearchValue(val){
      console.log(val);
      this.$router.push('roomType');
    },
    searchByName(){
      this.isSelectBg = true;
    },
    searchByID(){
      this.isSelectBg = false;
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips, DisclaimerContent, Keyborad }
}
</script>

<style lang="less">
#OrderRoom {
  .selectBg{
    background:#03E7E7;
    color: #013F3D!important;
  }
  .findorder{
    float:left;
    margin:114px 0 0 60px;
    .orderType{
      margin-left: 44px;
      > ul li:first-child{
        border-radius: 12px 0 0 12px;
        cursor: pointer;
      }
      > ul li:last-child{
        border-radius:0 12px 12px 0;
        cursor: pointer;
      }
      li{
        color: #FAFAFB;
        font-size: 26px;
        display: inline-block;
        height:58px;
        width:196px;
        text-align: center;
        border:1px solid #02FBE7;
        line-height: 58px;
      }
    }
    .searchOrder{
      > img{
        width:56px;
        height:56px;
        float: left;
        margin-top: 18px;
      }
      > .Keyborad{
        float: left;
        margin:20px;
      }
    }
    .searchIdCard{
      > div{
        padding:2px 0 0 0;
        width:220px;
        height:298px;
        background:rgba(3,212,231,0.25);
        border-radius: 4px;
        margin:32px 0 0 136px;
        > p{
          color:#F8F9FB;
          font-size:20px;
          text-align: center;
          margin:16px 0;
        }
        > img{
          width:190px;
          height:218px;
          margin:0 15px 0;
        }
      }
    }
  }
}
</style>
