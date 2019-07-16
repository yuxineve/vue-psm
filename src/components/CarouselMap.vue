
<template>
  <div id="CarouselMap">
    <ul>
      <li>
          <img v-for="(item,index) in carouselData.carouselImg" :key="index" :src="item.img" :alt="item.title" :class="{active:index == num}">
      </li>
    </ul>
  </div>
</template>

<script>
import { setInterval } from 'timers';
export default {
  name: 'CarouselMap',
  data () {
    return {
      num:0,
    }
  },
  created () {
    const time = this.carouselData.carouselTime
    setInterval(this.autoPlay,time);
  },
  methods: {
     autoPlay() {
        this.num ++;
        const len = this.carouselData.carouselImg.length
        if(this.num == len){
          this.num = 0;
        }
    }
  },
  computed: {},
  watch: {},
  props: ['carouselData'],//carouselData:{carouselTime:1000,carouselImg:[{img:'',title:''}]}
  components: {}
}
</script>

<style lang="less">
#CarouselMap{
  position: relative;
  height: 100%;
  img{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 1s;
  }
  .active{
    opacity: 1;
    transition: all 1s;
  }
}
</style>
