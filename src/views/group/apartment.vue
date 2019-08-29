<!-- 房间状态 -->
<template>
  <div id="ApartmentGP" class='contentView'>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>请选择入住房间</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="roomContent">
      <div class="toolTip">
        <span>房间选择：</span>
        <label>可办理</label>
        <label>已选中</label>
        <label>已办理</label>
      </div>
      <div class="roomMsg">
        <div>
          <ul>
            <li v-for="(item,index) in roomMsg" :key="index" @click="selectRoom(item,index)">
              <label v-if="item.state == 1" class="canHandle" :class="isActive == index? 'handleIng' : ''">
                {{item.roomNum == ""? "空房" : item.roomNum}}
                <i v-if="!item.isNum">{{item.remain}}/{{item.totle}}</i>
              </label>
              <label v-if="item.state == 3" class="disHandle">
                {{item.roomNum == ""? "空房" : item.roomNum}}
                <i v-if="!item.isNum">{{item.remain}}/{{item.totle}}</i>
              </label>
            </li>
          </ul>
        </div>
        <div class="clearfix">
          <img src="../../assets/images/1.jpg" />
          <span class="btn" @click="confirmRoomed">确认入住</span>
          <label>房型：{{selectRoomMsg.roomType}}</label>
          <label>房间号：{{selectRoomMsg.roomNum}}</label>
          <label>姓名：{{selectRoomMsg.name == "" ? "&nbsp;—&nbsp;" : selectRoomMsg.name}}</label>
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
  name: 'Apartment',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
      isActive:'-1',
      selectRoomMsg:'',
      roomMsg:[
        { 
          roomNum:'102',
          roomType:'大嘴猴',
          id:1,
          state:1,//1：可办理，2：已选中，3：已办理
          isNum:true,
          name:'zuikeao',
        },{
          roomNum:'1023',
          roomType:'标准主题房',
          id:2,
          state:3,
          isNum:true,
          name:'',
        },{
          roomNum:'6723',
          roomType:'标准主题房',
          id:3,
          state:1,
          name:'',
          isNum:true,
        },{
          roomNum:'234',
          roomType:'标准主题房',
          id:4,
          name:'',
          state:3,
          isNum:true,
        },{
          roomNum:'1567',
          roomType:'标准主题房',
          id:5,
          name:'',
          state:1,
          isNum:true,
        },{
          roomNum:'456',
          roomType:'标准主题房',
          id:6,
          name:'',
          state:1,
          isNum:true,
        },{
          roomNum:'0921',
          roomType:'标准主题房',
          id:7,
          state:1,
          name:'',
          isNum:true,
        },{
          roomNum:'',
          roomType:'无房号房型',
          id:8,
          state:1,
          name:'',
          isNum:false,
          totle:2,
          remain:1,
        },{
          roomNum:'234',
          roomType:'标准主题房',
          id:4,
          state:3,
          name:'',
          isNum:true,
        },{
          roomNum:'1567',
          roomType:'标准主题房',
          id:5,
          state:1,
          name:'',
          isNum:true,
        },{
          roomNum:'456',
          roomType:'标准主题房',
          id:6,
          state:1,
          name:'',
          isNum:true,
        },{
          roomNum:'0921',
          roomType:'标准主题房',
          id:7,
          state:1,
          name:'',
          isNum:true,
        },{
          roomNum:'',
          roomType:'无房号房型',
          id:8,
          state:3,
          name:'',
          isNum:false,
          totle:2,
          remain:0,
        }
      ],
    }
  },
  created () {
    const that = this;
    this.$store.commit("changeStatus", true);//显示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 0) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    for(let i=0;i<that.roomMsg.length;i++){
      if(that.roomMsg[i].state == 1){
        that.isActive = i;
        that.selectRoomMsg = that.roomMsg[i];
        break;
      }
    }
  },
  methods: {
    selectRoom(item,index){
      if(item.state == 3){
        Message({
          message: '该房间已办理完成！',
          type: 'warning'
        });
      }else{
        this.isActive = index;
        this.selectRoomMsg = item;
      }
    },
    confirmRoomed(){
      this.$router.push('verifyIdentityGP');
    }
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#ApartmentGP {
  .roomContent{
    float: left;
    width:766px;
    height:460px;
    background:rgba(0,0,0,0.95);
    border-radius: 10px;
    margin:88px 0 0 14px;
    .toolTip{
      color: #FDFEFE;
      padding:16px 0 0 0;
      height:76px;
      line-height: 64px;
      > span{
        font-size: 24px;
        margin-left:46px;
      }
      :nth-child(2){
        background: url('~@/assets/images/canProcesse.png') center center no-repeat;
        background-size: cover;
        color: #D2D2D2;
      }
      :nth-child(3){
        background: url('~@/assets/images/processing.png') center center no-repeat;
        background-size: cover;
        color:#012625;
      }
      :nth-child(4){
        background: url('~@/assets/images/processed.png') center center no-repeat;
        background-size: cover;
        color: #012625;
      }
      > label{
        font-size:6px;
        display: inline-block;
        width:50px;
        height: 64px;
        margin-left: 26px;
        text-align:center;
      }
    }
    .roomMsg{
      > div{
        float: left;
      }
      div:nth-child(1){
        width:470px;
        height:322px;
        overflow-y: auto;
        overflow-x: hidden;
        margin-left: 56px;
        >ul li:nth-child(n+5){
          margin-top: 6px;
        }
        >ul li{
          width:80px;
          height: 102px;
          float: left;
          margin-right: 34px;
          position: relative;
          > label{
            display: inline-block;
            width:100%;
            height:100%;
            font-size:16px;
            color: #012625;
            text-align: center;
            line-height: 102px;
            > i{
              position:absolute;
              font-size:10px;
              left: 34px;
              bottom: -16px;
            }
          }
          .canHandle{
            background: url('~@/assets/images/canProcesse.png') center center no-repeat;
            background-size: cover;
            color: #D2D2D2;
            cursor: pointer;
          }
          .handleIng{
            background: url('~@/assets/images/processing.png') center center no-repeat;
            background-size: cover;
            color: #012625;
            cursor: pointer;
          }
          .disHandle{
            background: url('~@/assets/images/processed.png') center center no-repeat;
            background-size: cover;
          }
        }
      }
      div:nth-child(2){
        width:218px;
        height:298px;
        background:rgba(3, 231, 231, 0.4);
        border-radius: 10px;
        border: 1px solid rgba(243,152,0,0.4);
        margin:8px 0 0 20px;
        > img{
          width:190px;
          height:114px;
          border-radius: 10px;
          margin:15px 15px 8px 15px;
        }
        > span{
          width:134px;
          height:38px;
          background:#F39800;
          border-radius: 8px;
          color: #012625;
          font-size: 20px;
          text-align: center;
          line-height:38px;
          display: block;
          margin: 4px 10px 8px 40px;
          cursor: pointer;
        }
        > label{
          border:1px solid #03D4E7;
          width:114px;
          height:26px;
          line-height: 26px;
          text-align: left;
          display:block;
          border-radius: 5px;
          color: #FAFAFB;
          padding-left: 6px;
          margin:6px 48px 0px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
