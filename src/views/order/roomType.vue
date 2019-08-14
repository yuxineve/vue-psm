<!-- 房型状态 -->
<template>
  <div id="RoomType" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>请选择入住房型</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="roomContent">
      <div class="toolTip clearfix">
        <span>房态选择：</span>
        <label>可办理</label>
        <label>已选中</label>
        <label>已办理</label>
      </div>
      <div class="roomMsg clearfix">
        <div>
          <ul>
            <li v-for="(item,index) in roomType" :class="[isactive == index?'processing':'',item.state == 3?'processed':'']" @click="selectRoomType(item,index)" :key="index">
              <img :src="item.img" />
              <div>
                <label>{{item.title}}</label>
                <label>{{item.roomRemain}}/{{item.roomTotle + '间'}}</label>
              </div>
            </li>
          </ul>
        </div>
        <div class="clearfix">
          <img src="../../assets/images/1.jpg" />
          <span class="button" @click="sureRoomed">确认入住</span>
          <span>
            <label>房型：{{roomMsg.roomType}}</label>
            <label>房间总数：{{roomMsg.roomTotle + '间'}}</label>
            <label>剩余房间：{{roomMsg.roomRemain + '间'}}</label>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import '@/assets/style/common.less';
import StepTips from "@/components/StepTips"
import { Button, Message } from "element-ui"

Vue.use(Button);

export default {
  name: 'RoomType',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
      roomMsg:{},
      isactive:'-1',
      roomType:[{
        title:'标准主题房',
        img:require("@/assets/images/login.jpg"),
        roomTotle:'100',
        roomRemain:"10",
        id:1,
        state:'1',//1；可办理，2：已选中，3：已办理
        roomType:'大嘴猴1',
      },{
        title:'标准主题房',
        img:require("@/assets/images/adImgLevel-2/ad1.jpg"),
        roomTotle:'100',
        roomRemain:"1",
        id:2,
        state:'3',
        roomType:'大嘴猴16',
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        roomTotle:'100',
        roomRemain:"5",
        id:3,
        state:'1',
        roomType:'大嘴猴10',
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        roomTotle:'100',
        roomRemain:"5",
        id:4,
        state:'1',
        roomType:'大嘴猴17',
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        roomTotle:'100',
        roomRemain:"5",
        id:5,
        state:'3',
        roomType:'大嘴猴2',
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        roomTotle:'100',
        roomRemain:"5",
        id:6,
        state:'1',
        roomType:'大嘴猴3',
      },{
        title:'标准主题房',
        img:require("@/assets/images/1.jpg"),
        roomTotle:'100',
        roomRemain:"5",
        id:7,
        state:'1',
        roomType:'大嘴猴4',
      }],
    }
  },
  created () {
    const that = this;
    this.$store.commit("changeStatus", true);//显示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      if(key <= 0){
        val.selectClass = true;
      }else{
        val.selectClass = false;
      }
      return val;
    });
    for(let i=0;i<that.roomType.length;i++){
      if(that.roomType[i].state == 1){
        that.isactive = i;
        that.roomMsg = that.roomType[i];
        break;
      }
    }
  },
  methods: {
    selectRoomType(item,index){
      if(item.state == 3){
        Message({
          message: '该房型已办理完成！',
          type: 'warning'
        });
      }else{
        this.roomMsg = item;
        this.isactive = index;
      }
    },
    sureRoomed(){
      const id = this.roomMsg.id;
      this.$router.push({path:'apartment',query:{id:id}});
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#RoomType {
  .roomContent{
    float: left;
    width:766px;
    height:460px;
    background:rgba(0,0,0,0.95);
    border-radius: 10px;
    margin:88px 0 0 14px;
    .toolTip{
      color: #FDFEFE;
      padding:26px 0 0 0;
      height:76px;
      > span{
        font-size: 24px;
        margin-left:46px;
      }
      > label{
        font-size:16px;
        border-radius:6px;
        margin-left:30px;
        padding:8px 6px 10px 6px;
      }
      label:nth-child(2){
        border:1px solid #03D4E7;
      }
      label:nth-child(3){
        border: 1px solid #F39800;
      }
      label:nth-child(4){
        border: 1px solid #A0A0A0;
      }
    }
    .roomMsg{
      > div{
        float: left;
      }
      div:nth-child(1){
        width:488px;
        height:270px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-left:38px;
        ul li:nth-child(n+4){
          margin-top: 20px;
        }
        .processed{
          border: 2px solid #A0A0A0;
        }
        .processing{
          border: 2px solid #F39800;
        }
        ul li{
          width:134px;
          height:120px;
          border-radius:10px;
          overflow: hidden;
          border:2px solid #02C0D1;
          float: left;
          padding:0px;
          margin:0px 14px 0 4px;  
          img{
            width:100%;
            height:84px;
            border-radius: 10px;
            margin:0px;
          }
          > div{
            width:120px;
            height: 20px;
            background: rgba(3, 231, 231, 0.4);
            border-radius:5px;
            margin: 4px 9px;
            line-height: 22px;
            font-size:10px;
            :nth-child(1){
              float: left;
              color: #FDFEFE;
              margin-left: 6px;
            }
            :nth-child(2){
              float: right;
              color: #F39800;
              margin-right:6px;
            }
          }
        }
      }
      div:nth-child(2){
        width:218px;
        height:298px;
        border-radius:14px;
        background: rgba(3, 231, 231, 0.4);
        margin: -16px 0 0 18px;
        border: 1px solid rgba(243,152,0,0.4);
        > img{
          width:190px;
          height:114px;
          border-radius: 10px;
          margin:15px 15px 10px;
        }
        > span{
          margin:0 40px 0px;
          width:134px;
          height:38px;
          display: block;
        }
        .button{
          line-height: 38px;
          text-align:center;
          color: #012625;
          border-radius: 8px;
          background: #F39800;
          margin-bottom:6px;
          cursor: pointer;
        }
        > span > label{
          display:block;
          font-size:12px;
          color: #FAFAFB;
          border:1px solid #03D4E7;
          border-radius: 5px;
          width:105px;
          height:26px;
          line-height: 26px;
          text-align: left;
          margin: 6px 6px 0;
          padding: 0 0 0 15px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
