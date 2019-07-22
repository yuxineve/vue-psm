<!-- 首页 -->
<template>
  <div id="PageIntro" class="contentView">
    <div class="welcome">
      <div>
        <div>欢迎使用酒店智能入住终端</div>
        <div style="border:0.2rem solid #03E7E7;width:100%;margin-top:2.2rem"></div>
      </div>
    </div>
    <div class="leftTips">
      <div class="tipsBox">
        <span>请选择您的业务类型</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="btnSquare">
      <router-link :to="{ name: 'OrderRoom'}" >
        <div class="mainBtn">订单取房</div>
      </router-link>
      <router-link :to="{ name: 'SceneRoom'}">
        <div class="mainBtn">现场订房</div>
      </router-link>
      <router-link :to="{ name: 'GroupRoom'}">
        <div  class="mainBtn">团队入住</div>
      </router-link>
    </div>
    <div class="BtnRound">
      <router-link :to="{ name: 'ContinuedRoom'}" class="subBtn">
        <div>续房</div>
      </router-link>
      <router-link :to="{ name: 'CheckoutRoom'}" class="subBtn">
        <div>退房</div>
      </router-link>
      <router-link :to="{ name: 'Techrepublic'}" class="subBtn">
        <div>公安验证</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"

Vue.use(Button);

export default {
  name: 'PageIntro',
  data () {
    return {}
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏下一页的按键
    this.$store.commit("changeHomeStatus", false);//展示首页的按键
  },
  methods: {
    getPageButton(){
      this.$router.push('index/content');
    },
  },
  computed: { },
  watch: {},
  props: [ ],
  components: {  }
}
</script>

<style lang="less">
#PageIntro {
  .welcome{
    font-size: 3.6rem;
    color: #FDFDFD;
    width: 100%;
    // position: absolute;
    // top: 7.6rem;
    // left: calc(50% - 216px);
    float: left;
    text-align: center;
  }
  .welcome > div {
    width: 43.2rem;
    margin:7.6rem 0 0 32.4rem;
  }
  .btnSquare{
    // position: absolute;
    // right: 27.2rem;
    // top: 19.6rem;
    float: left;
    margin: 6rem 0 0 -3.4rem;
    .mainBtn{
      width:12rem;
      height:20rem;
      text-align: center;
      background:#F39800;
      float: left;
      margin-left: 7.4rem;
    }
  }
  .BtnRound{
    width: 30rem;
    position:absolute;
    right: 4rem;
    bottom: 2.8rem;
    .subBtn{
      width:8rem;
      height:8rem;
      border-radius: 4rem;
      text-align: center;
      background:#F39800;
      float:left; 
    }
    .subBtn:not(:first-of-type){
      margin-left: 3rem;
    }
  }

}
</style>
