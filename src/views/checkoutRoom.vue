<!--退房-->
<template>
  <div id="CheckoutRoom" class="contentView">
    
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'CheckoutRoom',
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
#CheckoutRoom {
  color:#333;
}
</style>
