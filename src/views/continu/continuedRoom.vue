<!--续房-->
<template>
  <div id="ContinuedRoom" class="contentView">
    
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'ContinuedRoom',
  data () {
    return {}
  },
  created () {
    this.$store.commit("changeStatus", true);//展示下一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#ContinuedRoom {
  color:#333;
}
</style>
