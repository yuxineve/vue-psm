
<template>
  <div id="TimeOut"  :class="{timeOutDisplay:count < 21}">
    <div>
      <img :src="timeOutSrc">
      <span>
        <label>返回首页</label>
        <label> {{ count }}S </label>
      </span>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';

export default {
  name: 'TimeOut',
  data () {
    return {}
  },
  created () {},
  methods: {},
  computed: {
    count() {
      // console.log(this.$store.state.count);
      return this.$store.state.count;
    },
    timeOutSrc(){
      return this.$store.state.timeOutSrc;
    }
  },
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#TimeOut {
    position: absolute;
    top: 621px;
    width: 100%;
    height: 646px;
    background: rgba(0,0,0,0.6);
    text-align: center;
    z-index: 999999;
    display:none;
    > div{
      width: 200px;
      height: 200px;
      overflow: hidden;
      position: absolute;
      top: calc(50% - 100px);
      left: calc(50% - 100px);
      > img{
        width:100%;
        height: 100%;
      }
      > span{
        position: absolute;
        color: #f0ae6d;
        width: 120px;
        top: calc(50% - 46px);
        left: calc(50% - 60px);
        height: 84px;
        text-align: center;
        > label{
          display: block;
          font-size:30px;
        }
        > label:first-child{
          margin-bottom:8px;
        }
      }
    } 
}
.timeOutDisplay{
  display:block!important;
}
</style>
