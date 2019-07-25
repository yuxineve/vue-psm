
<template>
  <div id="Child">
    I'm Child
    <div class="numKey">
      <input type="text" placeholder="数字键盘" @focus="show" data-layout="numeric" />
      <vue-touch-keyboard :options="options" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" />
    </div>
    <!-- 中英文输入键盘 -->
    <div class="chinessKey">
      <Keyborad :placeholder="placeholder" @getSearchValue="getSearchValue"></Keyborad>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTouchKeyboard from "vue-touch-keyboard"
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
import Keyborad from '@/components/vitualKeyboard/Keyboard'
//import noTouch from '@/utils/noTouch.js'

Vue.use(VueTouchKeyboard);
export default {
  name: 'Child',
  data () {
    return {
      placeholder:'请输入name',//中英文输入键盘
      //数字键盘
      visible: true,
      layout: "numeric",
      input: null,
      options: {
        useKbEvents: false,
        preventClickEvent: false
      }
    }
  },
  created () {
  
  },
  mounted (){
   // document.getElementById('inputArea').focus()
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
  watch: {},
  props: [ ],
  components: { Keyborad }
}
</script>

<style lang="less">
.numKey{
  position: absolute;
  width: 240px;
  .keyboard .line:nth-child(4) .key:nth-child(-n+3){
    display: none;
  }
  .keyboard .next {
    display: none
  }
  .keyboard .line:nth-child(4) .key{
    flex: 40!important;
  }
}

</style>
