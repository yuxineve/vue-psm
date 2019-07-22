<!--订单取房-->
<template>
  <div id="OrderRoom" class="contentView">
    
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'OrderRoom',
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
#OrderRoom {
  color:#333;
}
</style>
