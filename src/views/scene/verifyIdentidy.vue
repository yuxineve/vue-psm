<!--验证身份-->
<template>
  <div id="VerifyIdentidy" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span></span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="boxFlex" :class="{opacityHidden:isOpacity}">
      <div class="title"><span>身份证扫描</span></div>
      <div class="img" v-if="isIdentify">
        <img :src="IDCardImg"/>
      </div>
      <div class="img" v-else>
        <div class="IDCardImged"><img :src="IDCardImged"/></div>
        <div class="IDCardDetail">
          <span>姓&#12288;名：{{name}}</span>
          <span>身份证：{{IDCard}}</span>
        </div>
      </div>
    </div>
    <div class="boxFlex" :class="{opacityHidden:isOpacity}">
      <div class="title"><span>人脸识别</span></div>
      <div class="img">
        <img :src="faceImg"/>
      </div>
      <el-button type="success" v-if="!config.IsValid" @click="facedNext">下一步</el-button>
    </div>
    <div v-if="isOpacity" class="weChatPay">
      <div>
        <div><span>请使用微信扫描支付</span></div>
        <div class="wePayBorder">
          <img src="../../assets/images/wechat.png"/>
        </div>
      </div>
      <el-button type="warning">警告按钮</el-button>
    </div>
    <div class="boxFlex" style="background:rgba(3, 231, 231, 0.4)">
      <div class="title"><span>订单详情</span></div>
      <div class="img">
        <div class="orderImg"><img :src="orderImg"/></div>
        <div class="orderDetail">
          <span>房型：主题房</span>
          <span>房间：主题房</span>
          <span>总价：主题房</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import Vue from "vue"
import StepTips from "@/components/StepTips"
import { Button } from "element-ui"
import cfg from "@/config/index.js"

Vue.use(Button);

export default {
  name: 'VerifyIdentidy',
  data () {
    return {
      config:cfg,
      isOpacity:false,//暗化人脸识别和身份证模块
      siteStepText:this.$store.state.siteStepTextState,
      IDCardImg:require("@/assets/images/1.jpg"),
      IDCardImged:require("@/assets/images/1.jpg"),
      faceImg:require("@/assets/images/1.jpg"),
      orderImg:require("@/assets/images/1.jpg"),
      isIdentify:false,//是否识别完成
      name:'于小朵',
      IDCard:'230524199807022520',
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    facedNext(){
      this.isOpacity = true;
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#VerifyIdentidy {
  .opacityHidden{
    opacity:0.2;
  }
  .boxFlex{
    width:22rem;
    height:30rem;
    background:rgba(3, 231, 231, 0.25);
    border-radius: 1.4rem;
  }
  .boxFlex{
    float:left;
    margin-left:4rem;
    > .el-button--success{
      margin-top:4rem;
    }
    .title{
      width:100%;
      color: #F8F9FB;
      font-size: 2rem;
      text-align: center;
      height: 5rem;
      line-height: 5rem;
    }
    .img{
      width:19rem;
      height: 21.8rem;
      border-radius: 1rem;
      overflow: hidden;
      margin:.5rem 0 0 1.5rem;
      > img{ 
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .orderImg,.IDCardImged{
        width:19rem;
        height:11.4rem;
        border-radius: 1rem;
        overflow: hidden;
        > img{
          width:100%;
          height: 100%;
        }
      }
      .orderDetail,.IDCardDetail{
        width: 100%;
        height: 10rem;
        padding:0.2rem 4rem;
        > span{
          display: inline-block;
          width:9rem;
          height:2.6rem;
          border: .1rem solid #03D4E7;
          font-size: 1.2rem;
          color:#FAFAFB;
          border-radius: .5rem;
          line-height: 2.6rem;
          margin-bottom: .6rem;
          padding:0 .5rem;
        }
      }
      .IDCardDetail{
        padding:2.4rem 0.3rem 0.2rem;
        > span{
          width: 17rem;
          margin-bottom: 1.2rem;
        }
      }
    }
  }
  .boxFlex,.leftTips{
    margin-top: 15.8rem;
  }
  .weChatPay{
    position: absolute;
    background: #FBFEFE;
    width: 20rem;
    height: 28.2rem;
    border-radius: 0.5rem;
    top: 15.5rem;
    left: calc(50% - 10.4rem);
    padding:.8rem;
    > div{
      width: 20rem;
      height: 22rem;
      background: #23A93A;
      margin-bottom: 1.4rem;
      border-radius: .5rem .5rem 0 0;
      > div{
        color:#FBFEFE;
        font-size: 2rem;
        text-align: center;
        padding: 1rem 0;
      }
    }
    .wePayBorder{
      width: 15rem;
      height:15rem;
      background:url(~@/assets/images/weBorder.png) center center no-repeat;
      background-size: cover;
      padding:0;
      margin: .5rem 2.4rem;
      > img{ 
        width:90%;
        height:90%;
        margin-top:.6rem;
      }
    }
    .el-button--warning{
      width: 100%;
      color: #012625;
      background:#F39700;
    }
    .el-button{ 
      padding:17px 20px;
      border-radius:0 0 .5rem .5rem;
    }
  }
}
</style>
