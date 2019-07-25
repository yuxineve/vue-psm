
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
      <div class="roomImg"></div>
      <div><span>房间号：{{ roomNum }}</span></div>
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
      cardTips:'请取走房卡',//制卡失败
      roomNum:'8521',
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      return val.selectClass = true;
    })
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#MakeCard {
  .leftTips{
    margin-top: 15.6rem;
  }
  .cardTips{
    float:left;
    width:24rem;
    height: 34rem;
    background:rgba(3, 231, 231, 0.4);
    border-radius: 1.4rem;
    margin: 13.8rem 0 0 16rem;
    :nth-child(1){
      text-align: center;
      color: #F8F9FB;
      font-size:2rem;
      padding:1rem 0;
    }
    .roomImg{
      width:19rem;
      height:21.8rem;
      background:url('~@/assets/images/1.jpg') center center no-repeat;
      background-size: cover;
      border-radius:1rem;
      margin:1rem 2.5rem;
    }
    :last-child{
      text-align: center;
      font-size:1.6rem;
      > span{
        display:inline-block;
        width:15rem;
        height:2rem;
        text-align: center;
        border:.1rem solid #03D4E7;
        border-radius: .7rem;
        margin-top: .2rem;
      }
    }
  }
}
</style>
