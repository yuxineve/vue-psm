
<template>
  <div id="MakeCardGP" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span></span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="cardTips">
      <div><span>{{ cardTips }}</span></div>
      <div class="roomImg"><img :src=roomImgCard /></div>
      <div><span>房间号：{{ roomNum }}</span></div>
    </div>
    <div class="isContinu" v-if="isContinu">
      <div class="img">
        <p>是否继续办理</p>
        <div class="btn">
          <span @click="handlePromise">是</span>
          <span @click="handleReject">否</span>
        </div>
      </div>
    </div>
    <div class="adjust" style="float:left;margin:138px 0 0 160px" v-if="!config.isValid">
      <el-button type="success" plain @click="cardDefeated">制卡失败</el-button>
      <el-button type="success" plain @click="cardSuccess">制卡成功</el-button>
      <el-button type="success" plain @click="handleContinu">是否继续</el-button>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import Vue from "vue"
import { Button } from "element-ui"
import StepTips from "@/components/StepTips"
import cfg from "@/config/index.js"

Vue.use(Button);

export default {
  name: 'MakeCard',
  data () {
    return {
      config:cfg,
      siteStepText:this.$store.state.siteStepTextState,
      cardTips:'制卡中',//制卡失败,制卡中,请取走房卡
      roomNum:'8521',
      roomImgCard:'',
      isContinu:false,
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      return val.selectClass = true;
    });
    this.roomImgCard = require("@/assets/images/cardMaking.gif");
  },
  methods: {
    cardDefeated(){
      this.cardTips = '制卡失败';
      this.roomImgCard = require("@/assets/images/cardDefeated.png");
    },
    cardSuccess(){
      this.cardTips = '请取走房卡';
      this.roomImgCard = require("@/assets/images/cardSuccess.png");
    },
    handleContinu(){
      this.isContinu = true;
    }, 
    handlePromise(){
      this.$router.push('roomTypeGP')
    },
    handleReject(){
      this.$router.push('/home');
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#MakeCardGP {
  .leftTips{
    margin-top: 156px;
  }
  .adjust{
    width:100px;
    height:300px;
    > button{
      margin:10px 0 0 0;
      // float: left;
    }
  }
  .cardTips{
    float:left;
    width:240px;
    height: 340px;
    background:rgba(3, 231, 231, 0.4);
    border-radius: 14px;
    margin: 138px 0 0 160px;
    :nth-child(1){
      text-align: center;
      color: #F8F9FB;
      font-size:20px;
      padding:10px 0;
    }
    .roomImg{
      width:190px;
      height:218px;
      // background:url('~@/assets/images/1.jpg') center center no-repeat;
      // background-size: cover;
      border-radius:10px;
      margin:10px 25px;
      overflow: hidden;
      > img{
        width:100%;
        height: 100%;
        padding:0;
      }
    }
    :last-child{
      text-align: center;
      font-size:16px;
      > span{
        display:inline-block;
        width:150px;
        height:20px;
        text-align: center;
        border:1px solid #03D4E7;
        border-radius: 7px;
        margin-top: 2px;
      }
    }
  }
  .isContinu{
    width:440px;
    height:300px;
    background:rgba(0,0,0,0.7);
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 220px);
    border-radius:10px;
    > div{
      width:257px;
      height:234px;
      background:url('~@/assets/images/continue.gif') center center no-repeat;
      background-size: cover;
      position:absolute;
      top:calc(50% - 120px);
      left: calc(50% - 128px);
      text-align: center;
      color: #FBFBFB;
      > p{
        font-size:20px;
        height: 40px;
        line-height: 40px;
        margin-top: 70px;
      }
      .btn{
        > span{
          display:inline-block;
          width:50px;
          height:28px;
          font-size:16px;
          border:1px solid #03D4E7;
          border-radius:6px;
          line-height:28px;
          margin:0 17px 0 17px;
          cursor: pointer;
        }
        > span:first-child{
          background:#F39800;
          color: #013F3D;
          border:1px solid #F39800;
        }
      }
    }
  }
}
</style>
