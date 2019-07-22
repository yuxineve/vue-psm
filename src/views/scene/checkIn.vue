<!--办理入住-->
<template>
  <div id="CheckIn" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span></span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="roomMsg">
      <div class="roomDetail">
        <div class="bundle clearfix">
          <div class="peopleoImg"></div>
          <div class="selectPeople">
            <span>单房入住人数</span>
            <div class="selectNum">
              <ul>
                <li v-for="(item,index) in selectNumP" :key="index" :class="{'active':IsActiveP == index}" @click="handleActiveP(index)">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bundle clearfix">
          <div class="dayNumImg"></div>
          <div class="selectDate">
            <span>请选择入住天数</span>
            <div class="selectNum">
              <ul>
                <li v-for="(item,index) in selectNumD" :key="index" :class="{'active':IsActiveD == index}" @click="handleActiveD(index)">{{item}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="roomImg"></div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import StepTips from "@/components/StepTips"

export default {
  name: 'CheckIn',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      selectNumP:['1人','2人','3人','4人'],
      selectNumD:['1天','2天','3天','4天','5天','其他'],
      IsActiveP:0,//选择人数
      IsActiveD:0,
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    handleActiveP(index){
      this.IsActiveP = index;
    },
    handleActiveD(index){
      this.IsActiveD = index;
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#CheckIn {
  color:#333;
  .leftTips,.roomMsg{
    margin-top:15.6rem;
  }
  .roomMsg,.roomMsg > div,.bundle> div,.selectNum li{
    float: left;
  }
  .roomMsg{
    color: #F8F9FB;
    .peopleoImg,.dayNumImg{
      width: 5.6rem;
      height:5.6rem;
      background:#03C3C3;
      border-radius: 1rem;
    }
    .selectPeople,.selectDate{
      margin-left:1rem;
      span{
        font-size: 2.6rem;
      }
      .selectNum{
        margin-top: 1rem;
      }
      .selectNum li{
        font-size: 1.6rem;
        border-radius: .5rem;
        border: 1px solid #03D4E7;
        width:4rem;
        height:3rem;
        text-align: center;
        line-height: 3rem;
        margin-right: 1rem;
        cursor: pointer;
      }
    }
  }
  .bundle{
    margin-bottom: 2.5rem;
  }
}
</style>
