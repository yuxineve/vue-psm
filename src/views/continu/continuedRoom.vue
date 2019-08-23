<!--续房-->
<template>
  <div id="ContinuedRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="content">
      <div class="roomCard">
        <p>请插入房卡</p>
        <img :src="roomCardImg" />
      </div>
      <div class="priceOrder">
        <p>价格详情</p>
        <span v-if="isReadCard">
          <div class="priceContent">
            <ul>
              <li v-for="(item,index) in priceDetail" :key="index" @click="toggleSelectDate(item,index)" :class="{isActiveColor:item.active}">
                <span class="date">{{item.date}}</span>
                <span class="price">{{'￥ ' + item.price}}</span>
              </li>
            </ul>
          </div>
          <div class="priceMsg">
            {{totleDay}}天总价：{{totlePrice}}元
          </div>
        </span>
        <img :src="priceImg" v-else/>
      </div>
      <div class="btn">
        <button @click="handleSure" :disabled="!isReadCard" :class="{canClickSure:isReadCard}">确认续住</button>
        <button @click="handleCancel" :disabled="!isReadCard" :class="{canClickCancel:isReadCard}">取消续住</button>
      </div>
      <div class="weChatPay" v-if="isPay">
        <div>
          <div class="wechatImg">
            <p>请使用微信扫描支付</p>
            <div>
              <img src="../../assets/images/wechat.png" />
            </div>
          </div>
          <div class="wechatBtn" @click="handleCard">完成支付</div>
        </div>
      </div>
      <div class="orderDetail">
        <p>订单详情</p>
        <img :src="orderImg" />
        <span :class="{activeMsg:isReadCard}">
          <label>姓名：{{roomMsg.name}}</label>
          <label>房型：{{roomMsg.roomType}}</label>
          <label>房间：{{roomMsg.roomNum}}</label>
        </span>
      </div>
    </div>
    <span v-if="!config.isValid">
       <el-button type="success" @click="handleReadFailure">读卡失败</el-button>
       <el-button type="success" @click="handleReadSuccess">读卡成功</el-button>
    </span>
  </div>
</template>

<script>
import Vue from "vue"
import StepTips from "@/components/StepTips"
import DisclaimerContent from "@/components/Content"
import { Button } from "element-ui"
import cfg from "@/config/index.js"
import common from "@/utils/common.js"
import '@/assets/style/common.less';

Vue.use(Button);

export default {
  name: 'ContinuedRoom',
  data () {
    return {
      config:cfg,
      siteStepText:this.$store.state.continuStepTextState,
      leftTips:'hahhahahhah',
      roomCardImg:require("@/assets/images/insertCard.gif"), 
      priceImg:require("@/assets/images/loadRead.gif"),
      orderImg:require("@/assets/images/orderImg.png"),
      isPay:false,
      roomMsg:{
        name:'***',
        roomType:'***',
        roomNum:'***',
      },
      isReadCard:false,//是否读卡成功
      totleDay:0,
      totlePrice:0,
      priceDetail:[{
        price:'100',
        date:'8月21日',
      },{
        price:'200',
        date:'8月22日',
      },{
        price:'150',
        date:'8月23日',
      },{
        price:'110',
        date:'8月24日',
      },{
        price:'500',
        date:'8月25日',
      }]
    }
  },
  created () {
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 0) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
  },
  methods: {
    handleSure(){//确认续住
      this.isPay = true;
      this.siteStepText.map((val,key) => {
      (key <= 1) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    },
    handleCancel(){//取消续住
      this.$router.push('/home');
    },
    handleReadFailure(){//读卡失败
      this.leftTips = '无法读取房卡信息，请移步前台办理，谢谢';
      this.roomCardImg = require("../../assets/images/cardDefeated.png");
    },
    handleReadSuccess(){//读卡成功
      this.roomCardImg = require("../../assets/images/readCardSuccess.png");
      this.orderImg = require("@/assets/images/1.jpg");
      this.leftTips = '读卡成功';
      this.isReadCard = true;
    }, 
    toggleSelectDate(item,index){//在价格详情处选中续住天数
      const that = this;
      that.totleDay = 0;
      that.totlePrice = 0;
      item.active = !item.active;
      this.priceDetail.map((val,key) => {
        if(val.active){
          that.totleDay++;
          that.totlePrice += parseFloat(val.price);
        }
      });
      this.$forceUpdate();
    },
    handleCard(){
      this.$router.push('markCardContinu');
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips, DisclaimerContent }
}
</script>

<style lang="less">
#ContinuedRoom {
  .content{
    width:810px;
    height:310px;
    float: left;
    margin-top:158px;
    position:relative;
    > .orderDetail,.priceOrder,.roomCard{
      width:190px;
      height:300px;
      float: left;
      border:1px solid rgba(243,152,0, 0.4);
      background:rgba(3, 231, 231, 0.4);
      border-radius:14px;
      margin-left:16px;
      padding:0 15px;
      > p{
        font-size:20px;
        color: #F8F9FB;
        text-align:center;
        margin:16px 0;
      }
      > img{
        width:190px;
        height:218px;
      }
    }
    .priceOrder{
      color:#F8F9FB;
      font-size:14px;
      .priceContent{
        width:174px;
        height:184px;
        border:1px solid #03D4E7;
        border-radius:8px;
        margin-left: 6px;
        > ul{
          margin:2px 0 0 6px;
        }
        span{ 
          display:inline-block;
          text-align:center;
          height:24px;
          line-height:24px;
          border:1px solid #03D4E7;
          border-radius:5px;
          margin:8px 8px 0 8px;
          cursor:pointer;
        }
        .date{
          width:66px;
        }
        .price{
          width:60px;
        }
        .isActiveColor{
          > span{
            background:#F39800;
            border: 1px solid #F39800;
            color: #013F3D;
          }
        }
      }
      .priceMsg{
        width:140px;
        height:30px;
        line-height:32px;
        border:1px solid #03D4E7;
        border-radius:6px;
        margin:14px 22px 0 22px;
        padding:0 0 0 8px;
        white-space: nowrap;
      }
    }
    .orderDetail{
      > img{
        height:114px;
      }
      > span{
        display:inline-block;
        margin:4px 34px;
        label{ 
          display:inline-block;
          width:112px;
          height:26px;
          line-height:26px;
          border:1px solid #666666;
          font-size:12px;
          border-radius:6px;
          padding:0 0 0 8px;
          margin-top:6px;
          color: #8E8E90;
        }
      }
      .activeMsg{
        > label{
          border:1px solid #03D4E7;
          color: #FAFAFB;
        }
      }
    }
    .btn{
      float:left;
      width:90px;
      margin-top:100px;
      > button{
        float: left;
        width:88px;
        height:30px;
        color: #8E8E90;
        border-radius:7px;
        margin:14px 12px 0 12px;
        background:none;
        border:1px solid #666;
        cursor: not-allowed;
      }
      > button:first-child{
        background:#666;
      }
      .canClickCancel{
        color: #FAFAFB;
        border:1px solid #F39800;
        cursor:pointer;
      }
      .canClickSure{
        background:#F39800!important;
        border:1px solid #F39800;
        color: #013F3D;
        cursor:pointer;
      }
    }
    .weChatPay{
      position:absolute;
      width:578px;
      height:352px;
      background:rgba(0,0,0,0.8);
      border-radius:10px;
      > div{
        background:#FBFEFE;
        width:200px;
        height:282px;
        padding:8px;
        border-radius:5px;
        position:absolute;
        top:calc(50% - 149px);
        left: calc(50% - 108px);
        .wechatImg{
          width:200px;
          height:220px;
          background:#23A93A;
          border-radius:5px 5px 0 0;
          color: #FBFEFE;
          font-size: 20px;
          margin-bottom:14px;
          > p{
            margin: 0px;
            padding: 14px 0;
            text-align: center;
          }
          > div{
            background:url('~@/assets/images/weBorder.png') center center no-repeat;
            background-size: cover;
            width:150px;
            height:150px;
            margin:4px 25px 19px 25px;
            >img{
              width: 136px;
              height: 136px;
              border-radius: 4px;
              border-radius:4px;
            }
          }
        }
        .wechatBtn{
          width:200px;
          background:#F39700;
          height:50px;
          color: #012625;
          font-size:20px;
          text-align: center;
          line-height:50px;
          border-radius:0 0 5px 5px;
          cursor:pointer;
        }
      }
    }
  }
}
</style>
