<!--公安验证-->
<template>
  <div id="Techrepublic" class="contentView">
    
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'Techrepublic',
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
#Techrepublic {
  color:#333;
}
</style>
