<!--步骤提示条-->
<template>
  <div id="StepTips">
    <div v-for="(item,index) in siteStepText" :key="index" class="stepBorder">
      <div class="numBox">{{item.num}}</div>
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
  top: 1.4rem;
  right: 2rem;
  .stepBorder{
    width:15.6rem;
    height: 4.4rem;
    border:1px solid rgba(3,231,231,0.4);
    float: left;
    border-radius: .8rem;
    .numBox{
      width:5rem;
      height:4.4rem;
      border-radius: .8rem;
      background: rgba(3,231,231,0.4);
      font-size: 2.4rem;
      font-family: 'ALHY';
      text-align: center;
      line-height: 4.4rem;
      float: left;
    }
    .textBox{
      float: right;
      font-size: 2.2rem;
      color: #CCCCCA;
      width: 10.6rem;
      height: 100%;
      line-height: 4.4rem;
      text-align: center;
    }
  }
  .stepBorder:not(:last-child){
    margin-right: 1.2rem;
  }
}
</style>
