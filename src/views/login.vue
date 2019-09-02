<!--登录页-->
<template>
  <div id="Login">
    <!-- <img :src="imgbg" alt="404 Not Found" style="overflow:hidden"/> -->
    <div class="btnWrap">
      <div class="login-name login-button">
        <span>
          <i class="el-icon-user"></i>
          <el-input v-model="username" name="username" placeholder="请输入账号"></el-input>
        </span>
      </div>
      <div class="login-password login-button">
        <span>
          <i class="el-icon-lock"></i>
          <el-input placeholder="请输入密码" name="password" v-model="password" show-password></el-input>
        </span>
      </div>
      <div class="login-button">
        <el-button type="primary" class="loginIn" @click="loginIn()">登 陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Input, Icon, Message } from "element-ui";

Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      imgbg: ""
    };
  },
  created() {},
  methods: {
    loginIn: function() {
      var that = this;
      if(this.username == "" || this.password == ""){
        Message({
          message: "账号或密码不能为空！",
          type: 'warning'
        });
        return;
      }
      const params = {
        username: this.username,
        password: this.password,
      };
      this.VueAxios(this.ServeApi.login, params)
      .then(res => {
        if(res.code == 200){
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("code",res.data.code);
          sessionStorage.setItem("enterpriseCode",res.data.enterpriseCode);
          sessionStorage.setItem("hotelId",res.data.hotelId);
          sessionStorage.setItem("url",res.data.url);
          that.$router.push("/home");
        }else{
          Message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
    }
  },
  computed: {},
  watch: {},
  props: [],
  components: {}
};
</script>

<style lang="less">
@import "../assets/style/common.less";
.login-button {
  width: 350px;
  span {
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      z-index: 2;
      top: 1px;
      left: 8px;
    }
    input {
      padding: 0 30px;
    }
  }
}
#Login {
  position: relative;
  background: url("~@/assets/images/login.jpg") center center no-repeat;
  background-size: cover;
  height: 100%;
  button.loginIn {
    width: 350px;
  }
}
.btnWrap {
  position: absolute;
  top: calc(50% - 106px);
  left: calc(50% - 175px);
  .login-button {
    margin-bottom: 30px;
  }
}
</style>
