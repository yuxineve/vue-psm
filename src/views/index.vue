
<template>
  <div id="Index">
    <VideoPlay />
    <router-view></router-view>
    <ImageAd />
  </div>
</template>

<script>
import Vue from "vue";
import VideoPlay from "@/components/VideoPlay"
import ImageAd from "@/components/ImageAd"

export default {
  name: "Index",
  data() {
    return {
    
    };
  },
  created() {},
  methods: {},
  computed: {},
  watch: {},
  props: [],
  components: { VideoPlay, ImageAd }
};
</script>

<style lang="less">
#Index{
  color: #333;
}
</style>
