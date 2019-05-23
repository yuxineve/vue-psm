
<template>
  <div id="Child">
    I'm Child
    <input type="text" placeholder="Text input" @focus="show" data-layout="normal" />
    <vue-touch-keyboard :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
    <Keyborad id="a" :placeholder="placeholder" @getSearchValue="getSearchValue"></Keyborad>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTouchKeyboard from "vue-touch-keyboard"
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
import Keyborad from '@/components/vitualKeyboard/Keyboard'

Vue.use(VueTouchKeyboard);
export default {
  name: 'Child',
  data () {
    return {
      placeholder:'请输入name',
      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    }
  },
  created () {

  },
  methods: {
    accept(text) {
      alert("Input text: " + text);
      this.hide();
    },
    show(e) {
      this.input = e.target;
      this.layout = e.target.dataset.layout;

      if (!this.visible)
        this.visible = true
    },
    hide() {
      this.visible = false;
    },
    getSearchValue(e) {
      console.log(e);
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { Keyborad }
}
</script>

<style lang="less">
@import '../assets/style/common.less';

</style>
