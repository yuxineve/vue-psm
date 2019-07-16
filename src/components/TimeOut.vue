
<template>
  <div id="TimeOut">
    <div v-if="count < 31 ">{{ count }}</div>
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
        console.log(this.$store.state.count);
      return this.$store.state.count;
    }
  },
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">
#TimeOut {
    color: #333;
    position: absolute;
    top: 36%;
    width: 100px;
    height: 100px;
    background: pink;
    text-align: center;
    div{
        color: #fff;
    } 
}
</style>
