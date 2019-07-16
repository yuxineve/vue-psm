
<template>
  <div id="PageIntro" class="mainView">
    hahahhahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
    <!-- //v-on:click="getPageButton" -->
    <router-link :to="{ name: 'Content'}">
      <el-button type="primary" plain >下一页</el-button>
    </router-link>
    <div v-if="count < 31 ">{{ count }}</div>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"

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
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
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
