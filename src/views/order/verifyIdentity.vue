<!--身份验证-->
<template>
  <div id="VerifyIdentity" class="contentView">
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
import Vue from "vue"
import '@/assets/style/common.less';
import StepTips from "@/components/StepTips"
import { Button, Message } from "element-ui"

Vue.use(Button);

export default {
  name: 'VerifyIdentity',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//显示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      if(key <= 1){
        val.selectClass = true;
      }else{
        val.selectClass = false;
      }
      return val;
    })
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#VerifyIdentity {
  color:#333;
}
</style>
