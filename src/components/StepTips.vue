<!--步骤提示条-->
<template>
  <div id="StepTips">
    <div v-for="(item,index) in siteStepText" :key="index" class="stepBorder" :class="{stepBoxSelect:item.selectClass}">
      <div class="numBox" :class="{stepNumSelect:item.selectClass}">{{item.num}}</div>
      <div class="textBox">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'StepTips',
  data () {
    return {}
  },
  created () {  },
  methods: {},
  computed: {},
  watch: {},
  props: [ 'siteStepText' ],
  components: {}
}
</script>

<style lang="less">

#StepTips {
  position: absolute;
  top: 14px;
  right: 20px;
  .stepBorder{
    width:156px;
    height: 42px;
    border:1px solid rgba(3,231,231,0.4);
    float: left;
    border-radius: 8px;
    color: #CCCCCA;
    .numBox{
      width:50px;
      height:44px;
      border-radius: 8px;
      background: rgba(3,231,231,0.4);
      font-size: 24px;
      font-family: 'ALHY';
      text-align: center;
      line-height: 44px;
      float: left;
      margin-top: -1px;
    }
    .textBox{
      float: right;
      font-size: 22px;
      width: 106px;
      height: 100%;
      line-height: 44px;
      text-align: center;
    }
  }
  .stepBorder:not(:last-child){
    margin-right: 12px;
  }
}
</style>
