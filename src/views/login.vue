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
import { Button, Input, Icon } from "element-ui";
import axios from "@/utils/api.js";
//import common from '@/utils/common.js'

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
      const options = {
        method: "post",
        url: "/api/auth?type=mpApp_register",
        arrayFormat: ""
      };
      const params = {
        userName: this.username,
        mp_code: this.password,
        state: 1213234321
      };
      axios(options, params)
        .then(data => {
          console.log(data);
          that.$router.push("/home");
        })
        .catch(e => {
          console.log(e);
        });
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
  width: 35rem;
  span {
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      z-index: 2;
      top: 0.1rem;
      left: 0.8rem;
    }
    input {
      padding: 0 3rem;
    }
  }
}
#Login {
  position: relative;
  background: url("~@/assets/images/login.jpg") center center no-repeat;
  background-size: cover;
  height: 100%;
  button.loginIn {
    width: 35rem;
  }
}
.btnWrap {
  position: absolute;
  top: calc(50% - 10.6rem);
  left: calc(50% - 17.5rem);
  .login-button {
    margin-bottom: 3rem;
  }
}
</style>
