
<template>
  <div id="Index">
    <VideoPlay />
    <Nav></Nav>
    <router-view></router-view>
    <div class="bottomBox"></div>    
    <div class="mainView">
      <CarouselMap :carousel-data="carouselData"></CarouselMap>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VideoPlay from "@/components/VideoPlay"
import CarouselMap from "@/components/CarouselMap"
import Nav from "@/components/Nav"


export default {
  name: "Index",
  data() {
    return {
      carouselData:{
        carouselTime:1000 *10,
        carouselImg:[
          { img: require("@/assets/images/adImgLevel-2/ad1.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-2/ad2.jpg"), title: 2 },
          { img: require("@/assets/images/adImgLevel-2/ad3.jpg"), title: 3 },
          { img: require("@/assets/images/adImgLevel-2/ad4.jpg"), title: 4 },
          { img: require("@/assets/images/adImgLevel-2/ad5.jpg"), title: 5 },
        ]
      },
    };
  },
  created() {
  },
  methods: {},
  computed: {},
  watch: {},
  props: [],
  components: { VideoPlay, CarouselMap, Nav }
};
</script>

<style lang="less">
#Index{
  .bottomBox{
    width: 100%;
    height: 1.2rem;
    background:#02C2C2;
  }
  color: #333;
}
</style>
