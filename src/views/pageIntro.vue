
<template>
  <div id="PageIntro" class="mainView">
    hahahhahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    <!-- //v-on:click="getPageButton" -->
    <router-link :to="{ name: 'Content'}">
      <el-button type="primary" plain >下一页</el-button>
    </router-link>
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
  created () {},
  methods: {
    getPageButton(){
      this.$router.push('index/content');
    },
  },
  computed: { },
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#PageIntro {
  color: #333;
}
</style>
