<!-- 房型状态 -->
<template>
  <div id="RoomType" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span></span>
      </div>
      <div class="tipsIcon"></div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import StepTips from "@/components/StepTips"

export default {
  name: 'RoomType',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
    }
  },
  created () {
     this.$store.commit("changeStatus", true);//显示上一页的按键
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#RoomType {
  color:#333;
}
</style>
