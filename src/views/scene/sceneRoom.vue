<!--现场订房-->
<template>
  <div id="SceneRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>请点击意向房型， 里面有信息</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="roomType">
      <div v-for="(item,index) in roomType" class="roomBorder" :key="index">
        <router-link :to="{ name: 'CheckIn', query:{id: item.id}}">
          <div class="roomPhoto"><img :src="item.img" />></div>
          <div class="priceBottom">
            <span>{{item.title}}</span>
            <span>{{item.price}}/天</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import DisclaimerContent from "@/components/Content"
import StepTips from "@/components/StepTips"

export default {
  name: 'SceneRoom',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      roomType:[{
        title:'标准主题房',
        img:require("@/assets/images/login.jpg"),
        price:'100',
        id:1,
      },{
        title:'标准主题房',
        img:require("@/assets/images/adImgLevel-2/ad1.jpg"),
        price:'100',
        id:2,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:3
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:4
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:5,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:6,
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        price:'100',
        id:7,
      }]
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {},
  computed: {},
  watch: {},
  props: [ ],
  components: { DisclaimerContent, StepTips}
}
</script>

<style lang="less">
#SceneRoom {
  .leftTips{
    margin-top:15.6rem;
  }
  .roomType{
    width: 75.6rem;//753
    height: 42rem;//408
    position: absolute;
    bottom: 4rem;
    right:2rem;
    overflow-x:hidden;
    overflow-y: auto; 
    .roomPhoto{
      width:22rem;
      height:14rem;
      border-radius:1rem;
      overflow: hidden;
      img{
        width: 22rem;
        height: 14rem;
      }
    }
  }
  .roomBorder{
    width: 22rem;
    height:18.8rem;
    border-radius: 10px;
    // opacity:0.4;
    border: 1px solid #F39800;
    float: left;
    margin:3.2rem 2.4rem 0 0;
    background: rgba(3, 231, 231, 0.25);
    .priceBottom{
      width: 17.6rem;
      height:3.2rem;
      background:rgba(3, 231, 231, 0.4);
      border-radius: 5px;
      margin: .8rem 1.6rem;
      line-height: 3.2rem;
      color: #F39800;
      font-size:1.6rem;
      padding:0 0.6rem;
      span:nth-child(1){
        float: left;
      }
      span:nth-child(2){
        float:right;
      }
    }
  }
  .roomBorder:nth-child(-n+3){
    margin-top: 0!important;
  }
}
</style>
