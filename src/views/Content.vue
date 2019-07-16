
<template>
  <div id="Content" class="mainView">
    content
    <el-button type="primary" plain v-on:click="goBack">返回</el-button>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"

Vue.use(Button)

export default {
  name: 'Content',
  data () {
    return {}
  },
  created () {},
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">

#Content {
  color: #333;
}
</style>
