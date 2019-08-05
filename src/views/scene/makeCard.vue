
<template>
  <div id="MakeCard" class="contentView">
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
    <div class="adjust" style="float:left;margin:138px 0 0 160px">
      <el-button type="success" plain @click="cardDefeated">制卡失败</el-button>
      <el-button type="success" plain @click="cardSuccess">制卡成功</el-button>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import Vue from "vue"
import { Button } from "element-ui"
import StepTips from "@/components/StepTips"

Vue.use(Button);

export default {
  name: 'MakeCard',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      cardTips:'制卡中',//制卡失败,制卡中,请取走房卡
      roomNum:'8521',
      roomImgCard:'',
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
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#MakeCard {
  .leftTips{
    margin-top: 156px;
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
}
</style>
