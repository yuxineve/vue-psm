
<template>
  <div id="Nav">
    <div class="nav">
        <div class="logioLeft">
          <div class="logioIcon"><img :src="navImage" alt=""></div>
          <div class="hotelTitle">{{navTitle}}</div>
        </div>
        <div class="buttonRight">
          <el-button v-if="this.$store.state.seenHome" type="warning" class="homePage" round v-on:click="homePage">首 页</el-button>
          <el-button v-if="this.$store.state.seenGoBack" type="warning" class="goBack" round v-on:click="goBack">上一步</el-button>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"
import '@/assets/style/common.less'

export default {
  name: 'Nav',
  data () {
    return {
      navTitle:'途易国际酒店',
      navImage:require("@/assets/images/logo.png"),
    }
  },
  created () {   },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    homePage(){
      this.$router.push('/index');
      this.$store.commit("changeDisclai", true);//展示免责
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#Nav {
  color: #333;
  .nav{
    width:100%;
    height:60px;
    background:#03C3C4;
    .logioLeft div{
      float: left;
    }
    .hotelTitle{
      font-size: 25px;
      margin-top: 12px;
    }
    .logioIcon{
      width: 48px;
      height: 48px;
      border-radius: 26px;
      background: #F39800;
      margin: 6px 8px 0 8px;
      overflow: hidden;
      img{ 
        width: 100%;
        height:100%;
      }
    }
    .goBack,.homePage{
      float: right;
      width: 82px;
      height: 40px;
      margin: 12px 12px 12px 0;
    }
    .el-button{
      font-size:14px;
      font-weight:normal;
    }
    .el-button.is-round{
      border-radius: 10px;
    }
    .el-button--warning{
      color: #012625;
    }
  }
}
</style>
