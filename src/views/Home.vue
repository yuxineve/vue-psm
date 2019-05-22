
<template>
  <div id="Home">
    <div>{{ count }} | {{ countAlias }} | {{ countPlusLocalState }}</div>
    <router-link to="/child">chilid</router-link>
    <router-view></router-view>
    <CarouselMap :carousel-data='carouselData'></CarouselMap>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import  CarouselMap  from '@/components/CarouselMap'

export default {
  name: 'Home',
  data () {
    return {
      carouselData:{
        carouselTime:15000,
        carouselImg:[{'img':require('@/assets/images/adImg/banner1.jpg'),'title':1}
                  ,{'img':require('@/assets/images/adImg/banner2.jpg'),'title':2}
                  ,{'img':require('@/assets/images/adImg/banner3.jpg'),'title':3}
                  ,{'img':require('@/assets/images/adImg/banner4.jpg'),'title':4}
                  ,{'img':require('@/assets/images/adImg/banner5.jpg'),'title':5}],
      },
      sContent: 'I am Home'
    }
  },
  created () {
    console.log(this.$router);
    this.isTimeOut();
  },
  methods: {
    startTimer:function(){
      let that = this;
      clearInterval(that.timeOut);
      that.timeOut = setInterval(function () {
        that.$router.push({path: '/home'})
      },1000*6)
    },
    isTimeOut:function(){
      let that = this;
      if(that.$route.path == "/") {
        that.startTimer();
      }
      document.body.onmouseup = that.startTimer;
      document.body.onmousemove = that.startTimer;
      document.body.onkeyup  = that.startTimer;
      document.body.onclick  = that.startTimer;
      document.body.ontouchend  = that.startTimer;
    },
  },
  computed: mapState({
    count: state => state.count,
    countAlias: 'count',
    countPlusLocalState  (state) {
      return state.count 
    }
  }),
  watch: {},
  props: [ ],
  components: { CarouselMap }
}
</script>

<style lang="less">
@import '../assets/style/common.less';
</style>
