
<template>
  <div id="ReBackRouter">
    
  </div>
</template>

<script>
export default {
  name: 'ReBackRouter',
  data () {
    return {}
  },
  created () {
    this.backFun();
  },
  methods: {
    backFun() {
      this.$router.replace({path: '/home'})
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: {}
}
</script>

<style lang="less">

</style>
