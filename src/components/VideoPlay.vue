
<template>
  <div id="videoPlay" class="">
    <video id="myvideo" muted width="1080px" height="100%" autoplay="autoplay">
      <source src="./../assets/videoAd/test1.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "videoPlay",
  data() {
    return {
      vList : [
        require("@/assets/videoAd/test1.mp4"),
        require("@/assets/videoAd/test2.mp4"),
        require("@/assets/videoAd/test3.mp4"),
        require("@/assets/videoAd/test4.mp4"),
        require("@/assets/videoAd/test5.mp4")
      ],
      curr:0,
    };
  },
  created() {},
  mounted(){
    this.autoPlay();
    this.endPlay();
  },
  methods: {
    autoPlay() {
      const that = this;
      const vLen = that.vList.length;
      const video = document.getElementById('myvideo');
      video.addEventListener('playing',function(){
        that.curr++;
        if(that.curr >= vLen){
          that.curr = 0;
        }
      });
    },
    endPlay() {
      const that = this;
      const video = document.getElementById('myvideo');
      video.addEventListener('ended',function(){
        video.src = that.vList[that.curr];
      });
    }
  },
  computed: {},
  watch: {},
  props: [],
  components: {}
};
</script>

<style lang="less">
#videoPlay{
  height:62.1rem;
  color: #333;
}
</style>
