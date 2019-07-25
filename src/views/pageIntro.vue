<!-- 首页 -->
<template>
  <div id="PageIntro" class="contentView">
    <div class="welcome">
      <div>
        <div>欢迎使用酒店智能入住终端</div>
        <div class="lace"></div>
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
        <div class="mainBtn"></div>
      </router-link>
      <router-link :to="{ name: 'SceneRoom'}">
        <div class="mainBtn"></div>
      </router-link>
      <router-link :to="{ name: 'GroupRoom'}">
        <div  class="mainBtn"></div>
      </router-link>
    </div>
    <div class="BtnRound">
      <router-link :to="{ name: 'ContinuedRoom'}" class="subBtn">
        <div></div>
      </router-link>
      <router-link :to="{ name: 'CheckoutRoom'}" class="subBtn">
        <div></div>
      </router-link>
      <router-link :to="{ name: 'Techrepublic'}" class="subBtn">
        <div></div>
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
    float: left;
    text-align: center;
    .lace{
      background:url('~@/assets/images/border.png') center center no-repeat;
      background-size: cover;
      width: 100%;
      height: 3.4rem;
      margin-top: 1rem;
    }
  }
  .welcome > div {
    width: 43.2rem;
    margin:7.6rem 0 0 33.8rem;
  }
  .btnSquare{
    float: left;
    margin: 4rem 0 0 -3.4rem;
    :nth-child(1) .mainBtn{
      background:url('~@/assets/images/order.png') center center no-repeat;
      background-size: cover;
    }
    :nth-child(2) .mainBtn{
      background:url('~@/assets/images/site.png') center center no-repeat;
      background-size: cover;
    }
    :nth-child(3) .mainBtn{
      background:url('~@/assets/images/group.png') center center no-repeat;
      background-size: cover;
    }
    .mainBtn{
      width:12rem;
      height:20rem;
      text-align: center;
      // background:#F39800;
      float: left;
      margin-left: 7.4rem;
    }
  }
  .BtnRound{
    width: 33rem;
    position:absolute;
    right: 4rem;
    bottom: 2.8rem;
    .subBtn{
      border-radius: 4rem;
      text-align: center;
      float:left; 
      div{
        width:9rem;
        height:9rem;
      }
    }
    .subBtn:not(:first-of-type){
      margin-left: 3rem;
    }
    :nth-child(1) div{
      background:url('~@/assets/images/continu.png') center center no-repeat;
      background-size: cover;
    }
    :nth-child(2) div{
      background:url('~@/assets/images/checkOut.png') center center no-repeat;
      background-size: cover;
    }
    :nth-child(3) div{
      background:url('~@/assets/images/public.png') center center no-repeat;
      background-size: cover;
    }
  }

}
</style>
