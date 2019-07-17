
<template>
  <div id="Nav">
    <div class="nav">
        <div class="logioLeft">
          <div class="logioIcon"></div>
          <div class="hotelTitle">{{vavTitle}}</div>
        </div>
        <div class="buttonRight">
          <el-button type="warning" class="homePage" round v-on:click="homePage">首 页</el-button>
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
      vavTitle:'途易国际酒店',
    }
  },
  created () {  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    homePage(){
      this.$router.push('/index');
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
    height:6rem;
    background:#03C3C4;
    .logioLeft div{
      float: left;
    }
    .hotelTitle{
      font-size: 2.2rem;
      margin-top: 1.3rem;
    }
    .logioIcon{
      width:5.2rem;
      height:5.2rem;
      border-radius: 2.6rem;
      background:#F39800;
      margin:0.4rem .8rem 0 .8rem;
    }
    .goBack,.homePage{
      float:right;
      width: 8.6rem;
      height: 4.2rem;
      margin:.7rem 2rem 0 0;
    }
    .el-button{
      font-size:1.6rem;
      font-weight:normal;
    }
    .el-button.is-round{
      border-radius: 1.6rem;
    }
    .el-button--warning{
      color: #012625;
    }
  }
}
</style>
