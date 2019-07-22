<!--大屏广告页-->
<template>
  <div id="Home">
    <!-- <div>{{ count }} | {{ countAlias }} | {{ countPlusLocalState }}</div> -->
    <router-view></router-view>
    <router-link to="/index">
      <CarouselMap :carousel-data="carouselData"></CarouselMap>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarouselMap from "@/components/CarouselMap";

export default {
  name: "Home",
  data() {
    return {
      carouselData: {
        carouselTime: 1000 * 10,
        carouselImg: [
          { img: require("@/assets/images/adImgLevel-1/banner1.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-1/banner2.jpg"), title: 2 },
          { img: require("@/assets/images/adImgLevel-1/banner3.jpg"), title: 3 },
          { img: require("@/assets/images/adImgLevel-1/banner4.jpg"), title: 4 },
          { img: require("@/assets/images/adImgLevel-1/banner5.jpg"), title: 5 }
        ]
      },
      timeOut: ""
    };
  },
  created() {},
  methods: {},
  components: { CarouselMap }
};
</script>

<style lang="less">
#Home {
  position: relative;
  height: 100%;
}
.enter {
  position: absolute;
  z-index: 5;
  left: 50%;
  display: block;
  font-size: 2.4rem;
  animation: flash 3s ease;
}
@keyframes flash {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
