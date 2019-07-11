
<template>
  <div id="Index">
    <div class="videosConten"></div>
    <div class="operateContent">
      <div v-if="count < 31 ">{{ count }}</div>
    </div>
    <div class="imagesContent"></div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Index',
  data () {
    return {}
  },
  created () {},
  methods: {},
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#Index {
  height: 100%;
  .videosConten,.operateContent,.imagesContent{
    height: 33%;
    border: 1px solid #ccc;
  }
}
</style>
