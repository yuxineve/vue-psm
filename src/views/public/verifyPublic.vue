
<template>
  <div id="VerifyPublic" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="content">
      <div class="selectNum clearfix">
        <img src="../../assets/images/peopleNum.png">
        <div>
          <span>单房入住人数</span>
          <ul>
            <li v-for="(item,index) in selectPeople" @click="handleSelectPeople(index)" :key="index" :class="{bgColor:index == isActive}">{{item + '人'}}</li>
          </ul>
        </div>
      </div>
      <div class="scanIdCard">
        <p>扫描身份证</p>
        <span v-if="isScanCard" class="checkSuccess">
          <img src="../../assets/images/idPhoto.png">
          <ul>
            <li>姓名：{{name}}</li>
            <li>身份证：{{idCard}}</li>
          </ul>
        </span>
        <span v-else>
          <img src="../../assets/images/idCard.gif" />
        </span>
      </div>
      <div class="face">
        <p>人脸识别</p>
        <img src="../../assets/images/face.gif" />
      </div>
      <div class="btn">取消办理</div>
      <div class="orderDetail">
        <p>订单详情</p>
        <img src="../../assets/images/1.jpg" />
        <span>
          <label>房型：{{roomDetail.roomType}}</label>
          <label>房间：{{roomDetail.roomNum}}</label>
        </span>
      </div>
      <div class="face-wrap popWrap" v-if="isface">
        <p>请对准摄像头</p>
        <div class="faceEmbed">
          <embed id="RoutonReader" type="application/mozilla-npruntime-scriptable-plugin" width="100%" height="100%" />
        </div>
      </div>
      <div class="popWrap" v-if="isContinu">
       <div class="continuWrap">
          <p>是否继续办理</p>
          <div class="btn">
            <span @click="handlePromise">是</span>
            <span @click="handleReject">否</span>
          </div>
       </div>
      </div>
    </div>
    <el-button type="success" @click="scanIdCard">扫描身份证</el-button>
    <el-button type="success" @click="handleFace">人脸识别</el-button>
    <el-button type="success" @click="handleContinu">是否继续</el-button>
  </div>
</template>

<script>
import Vue from "vue"
import StepTips from "@/components/StepTips"
import { Button } from "element-ui"
import cfg from "@/config/index.js"
import common from "@/utils/common.js"
import '@/assets/style/common.less';

Vue.use(Button);

export default {
  name: 'VerifyPublic',
  data () {
    return {
      siteStepText:this.$store.state.publicStepTextState,
      leftTips:'',
      roomDetail:{
        roomType:'dazuihou',
        roomNum:"9081",
      },
      isScanCard:false,//身份证扫描是否成功
      selectPeople:['1','2','3','4'],
      isActive:0,
      name:'lajdjs',
      idCard:'123456789098762546',
      isface:false,//是否展示识别人脸
      isContinu:false,
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示下一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 1) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
  },
  methods: {
    handleSelectPeople(index){
      this.isActive = index;
    },
    scanIdCard(){
      this.isScanCard = true;
      this.name = common.sensitString(this.name,0,1,'*');
      this.idCard = common.sensitString(this.idCard,4,4,'*');
    },
    handleFace(){
      this.isface = true;
    },
    handleContinu(){
      this.isface = false;
      this.isContinu = true;
    },
    handlePromise(){
      this.$router.push('techrepublic');
    },
    handleReject(){
      this.$router.push('/home');
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: {StepTips}
}
</script>

<style lang="less">
#VerifyPublic {
  .content{
    float:left;
    width:800px;
    height:392px;
    margin:112px 0 0 16px;
    position:relative;
    > div:not(:first-child){
      float: left;
    }
    .scanIdCard,.face,.orderDetail{
      width:190px;
      height:300px;
      background:rgba(3, 231, 231, 0.4);
      border:1px solid rgba(243,152,0, 0.4);
      border-radius:14px;
      margin-right:14px;
      padding:0 15px;
      > p{
        text-align:center;
        margin:16px 0;
        font-size:20px;
        color: #F8F9FB;
      }
      img{
        width:190px;
        height:218px;
      }
      .checkSuccess{
        > img{
          width:190px;
          height:114px;
        }
        >ul{
          li{ 
            width:160px;
            height:30px;
            line-height:30px;
            border:1px solid #03D4E7;
            color: #FBFCFC;
            font-size:12px;
            white-space:nowrap;
            border-radius:6px;
            margin:12px 10px 0 10px;
            padding-left:6px;
          }
        }
      }
    }
    .orderDetail{
      >img{
        width:190px;
        height:114px;
        border-radius: 6px;
        overflow:hidden;
      }
      > span{
        display:inline-block;
        margin:10px 34px;
        label{ 
          display:inline-block;
          width:112px;
          height:26px;
          line-height:26px;
          border:1px solid #03D4E7;
          font-size:12px;
          border-radius:6px;
          padding:0 0 0 8px;
          margin-top:10px;
          color: #FAFAFB;
        }
      }
    }
    .selectNum{
      margin:0 0 28px 44px;
      >img{
        width:56px;
        height:56px;
        float: left;
      }
      > div{
        float: left;
        color:#F8F9FB;
        font-size:26px;
        margin:-16px 0 0 18px;
        > ul{ 
          > li{
            float: left;
            font-size:16px;
            width:40px;
            height:30px;
            border:1px solid #03D4E7;
            border-radius:5px;
            margin:6px 10px 0 0;
            text-align: center;
            line-height:30px;
            cursor: pointer;
          }
          .bgColor{
            background:#F39800;
            border:1px solid #F39800;
          }
        }
      }
    }
    > .btn{
      width:88px;
      height:30px;
      color: #FAFAFB;
      font-size:14px;
      border:1px solid #F39800;
      border-radius:6px;
      text-align: center;
      line-height:30px;
      margin:180px 6px 0 -6px;
    }
    .popWrap{
      position:absolute;
      top:18px;
      width:560px;
      height:352px;
      background:rgba(0,0,0,0.8);
      text-align: center;
      .faceEmbed{
        width:348px;
        height:228px;
        border-radius:10px;
        overflow: hidden;
        border:15px solid rgba(255,255,255,0.25);
        position:absolute;
        top:calc(50% - 110px);
        left: calc(50% - 190px);
      }
      > p{
        color: #FBFEFE;
        font-size: 20px;
      }
      .continuWrap{
        background:url("~@/assets/images/continue.gif") center center no-repeat;
        background-size: cover;
        width:257px;
        height:234px;
        position:absolute;
        top:calc(50% - 116px);
        left: calc(50% - 126px);
        text-align: center;
        color: #FBFBFB;
        > p{
          font-size:24px;
          height: 40px;
          line-height: 40px;
          margin-top: 70px;
        }
        > div{
          > span{
            display:inline-block;
            border:1px solid #03D4E7;
            width:50px;
            height:28px;
            line-height:28px;
            text-align: center;
            border-radius:6px;
            cursor: pointer;
          }
          > span:first-child{
            background:#F39800;
            color: #013F3D;
            border:1px solid #F39800;
            margin-right:34px;
          }
        }
      }
    }
  }
}
</style>
