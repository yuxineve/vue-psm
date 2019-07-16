
<template>
  <div id="ImageAd">
    <CarouselMap :carousel-data="carouselData"></CarouselMap>
  </div>
</template>

<script>
import CarouselMap from "@/components/CarouselMap";

export default {
  name: 'ImageAd',
  data () {
    return {
      carouselData:{
        carouselTime:1000 *10,
        carouselImg:[
          { img: require("@/assets/images/adImgLevel-2/ad1.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-2/ad2.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-2/ad3.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-2/ad4.jpg"), title: 1 },
          { img: require("@/assets/images/adImgLevel-2/ad5.jpg"), title: 1 },
        ]
      },
    }
  },
  created () {},
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { CarouselMap }
}
</script>

<style lang="less">

#ImageAd {
  color: #333;
  overflow: hidden;
}
</style>
