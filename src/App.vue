<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="timeOut"></router-view>
  </div>
</template>
<script>
import Vue from "vue";
import '@/assets/style/common.less';

export default {
  data() {
    return {
      timeOutMsg: ""
    };
  },
  created() {
    this.isTimeOut();
  },
  methods: {
    isTimeOut: function() {
      let that = this;
      document.body.onmouseup = that.startTimer;
      document.body.onmousemove = that.startTimer;
      document.body.onkeyup = that.startTimer;
      document.body.onclick = that.startTimer;
      document.body.ontouchend = that.startTimer;
    },
    startTimer: function() {
      let that = this;
      that.$store.commit("init", 120); //初始化状态值
      if (that.$route.path != "/" || that.$route.path != "/home") {
        clearInterval(that.timeOutIndex);
        that.timeOutIndex = setInterval(function() {
          that.$store.commit("decrease"); //每秒状态值减一
          // console.log(that.$store.state.count);
          if (that.$store.state.count < 0) {
            that.$router.push({ path: "/home" });
            clearInterval(that.timeOutIndex);
          }
        }, 1000);
      }
    }
  }
};
</script>
<style lang="less">
body {
  height: 100%;
}
ul,
li,
body {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html,
body,
:global(#root) {
  background-color: #f8f8f8;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 14px;
  height: 100%;
  position: relative;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
