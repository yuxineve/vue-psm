
<template>
  <div id="Content">
    <el-button type="primary" plain v-on:click="getPageButton">主要按钮</el-button>
    content
    <div v-if="count < 31 ">{{ count }}</div>
  </div>
</template>

<script>
import Vue from "vue"
import { Button } from "element-ui"

export default {
  name: 'Content',
  data () {
    return {}
  },
  created () {},
  methods: {
    getPageButton(){
      console.log(this.$router)
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

#Content {
  color: #333;
}
</style>
