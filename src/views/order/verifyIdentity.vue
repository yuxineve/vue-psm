<!--身份验证-->
<template>
  <div id="VerifyIdentity" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="myself" v-if="config.chooseMyself">
      <span :class="{isMeBg:ISME}" @click="myselfHandle">本人</span>
      <span :class="{isMeBg:!ISME}" @click="notMyselfHandle">非本人</span>
    </div>
    <div class="verifyContent">
      <div class="selectPeople clearfix">
        <img src="../../assets/images/peopleNum.png" />
        <div class="titleRight">
          <span>单房入住人数</span>
          <ul>
            <li v-for="(item,index) in selectPeople" :key="index" @click="selectPeopleNum(item,index)" :class="{selectBorder:isActive==index}">
              {{item + '人'}}
            </li>
          </ul>
        </div>
      </div>
      <div class="msg clearfix">
        <div :class="{opacity:isOpacity}">
          <p>身份证扫描</p>
          <span v-if="isIdCard">
            <div class="orderDetail">
              <img src="../../assets/images/idPhoto.png" />
              <span>姓&#12288;名：{{name}}</span>
              <span>身份证：{{idCardNum}}</span>
            </div>
          </span>
          <span v-else>
            <img src="../../assets/images/idCard.gif" />
          </span>
        </div>
        <div :class="{opacity:isOpacity}">
          <p>人脸识别</p>
          <span v-if="isFace"></span>
          <span v-else>
            <img src="../../assets/images/face.gif" />
            <el-button v-if="!config.IsValid" type="success" @click="facedNext">识别人脸</el-button>
          </span>
        </div>
        <span class="camera" v-if="isOpacity">
          <div v-if="isIdentifyFace" class="pay">
            <div class="payBorder">
              <div>
                <p>请使用微信扫描绑定</p>
                <div class="weChatPay">
                  <img src="../../assets/images/wechat.png" />
                </div>
              </div>
              <div @click="markCard()">完成绑定</div>
            </div> 
          </div>
          <div v-else class="faceRecognition">
            <div>
              <embed id="RoutonReader" v-if="displayFaceImg" type="application/mozilla-npruntime-scriptable-plugin" width="100%" height="100%" />
              <img :src="faceImg" v-else />
            </div>
            <el-button type="success" v-if="!config.IsValid" @click="payNext">支付</el-button>
          </div>
        </span>
        <div v-if="isOpacity">
          <p>摄像头位置</p>
          <span>
            <img src="../../assets/images/goProSite.gif" />
          </span>
        </div>
        <div class="orderDetail" v-else>
          <p>订单详情</p>
          <img :src="orderDetail.src" />
          <label>房型：{{orderDetail.roomType}}</label>
          <label>房间：{{orderDetail.roomNum}}</label>
          <label>剩余房间数：{{orderDetail.roomRemain}}</label>
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
import cfg from "@/config/index.js"
import common from "@/utils/common.js"

Vue.use(Button);

export default {
  name: 'VerifyIdentity',
  data () {
    return {
      siteStepText:this.$store.state.orderStepTextState,
      leftTips:'',
      config:cfg,
      ISME:false,
      isOpacity:false,//是否隐藏id face order
      displayFaceImg:true,//是否隐藏识别的人脸照片
      isIdentifyFace:false,//人脸是否识别完成
      faceImg:'',//人脸识别后生成的img
      idCardNum:'',
      name:'',
      selectPeople:['1','2','3','4'],
      IDCardImged:'',//识别出的身份证照片
      isIdCard:false,//身份证是否扫描完成
      isFace:false,//人脸是否识别完成
      isActive:'0',
      orderDetail:{
        src:require("@/assets/images/1.jpg"),
        roomType:'主题房',
        roomNum:'6521',
        roomRemain:'0',
      }
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//显示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 1) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    if(cfg.chooseMyself){
      this.leftTips = '请确定要进行扫描的身份证是本人或是他人';
    }
  },
  mounted(){
    this.idcardHandle();
  },
  methods: {
    selectPeopleNum(item,index){
      this.isActive = index;
      cfg.peopleData.length = 0;//重新选择人数时，清空数组
      this.isIdCard = false;
      this.idcardHandle();
    },
    markCard(){
      this.$router.push('makeCard');
    },
    idcardHandle(){//识别身份信息
      const that = this;
      setTimeout(function(){	
        that.getDistingMark();
        const reg = new RegExp('base64');
        if(reg.test(that.IDCardImged)){
          const len = cfg.peopleData.length;
          cfg.peopleData.map((val,key,arr) => {
            if(len == (key+1)){
              that.name = common.sensitString(val.name,0,1,'*');
              that.idCardNum = common.sensitString(val.idCard,4,4,'*');
              that.isIdCard = true;
              if(cfg.IsValid){//有硬件时 录入人脸
                setTimeout(function(){
                  that.facedNext();
                  },1000)
              };
            }
          });
        }
      },1000);
    },
    getDistingMark(){//读卡识别返回信息
      let rst = '';
      rst = common.handleCard();
      if(rst == 0x90){
        this.leftTips = "身份扫描成功，请继续识别人脸！";
        this.IDCardImged =  common.getPeopleMsg();
      }else if(rst==0x02){
        this.leftTips = "请重新将卡片放到读卡器上！";
        this.getDistingMark();
      }else if(rst==0x41){
   			this.leftTips = "读取数据失败！";
        this.getDistingMark();
      }
    },
    facedNext(){//人脸识别
      this.isOpacity = true;
      this.leftTips = '请对准摄像头';
      // this.isIdentifyFace = true;
      let flag = this.compareNum();
    }, 
    compareNum(){//对人脸识别后的返回值，进行比较
    	var embedObj = document.getElementById("RoutonReader");
      const that = this;
      const returnData = common.faceVideoComp();
      console.log(returnData);
      if(returnData > 0){//成功比对出分值
        if(returnData < cfg.similar){
          this.leftTips = '人脸匹配低于' + cfg.similar*100 + '%' + ' 请重新验证';
          setTimeout(function() {
	          that.compareNum();
	        }, 1500);
        }else{
          this.leftTips = '相似对比度为：'+returnData.toFixed(2)*100+'%,请支付绑定该订单！';
          var len = cfg.peopleData.length;
	        cfg.peopleData.map((val,key) => {
	          if (len == (key + 1)) {
	            val.faceImg = embedObj.GetBase64Img("D:\\zjphoto\\face.jpg"); //人脸图像64编码
	            val.faceSimilar =  returnData.toFixed(2);//人脸识别相似度
	          }
          });
          //将图片转成base64编码显示到页面
          this.faceImg = 'data:image/bmp;base64,' + embedObj.GetBase64Img("D:\\zjphoto\\face.jpg");
          this.displayFaceImg = false;
          embedObj.FaceCloseVideo();//关闭摄像头
          embedObj.FaceRelease();//释放人脸库初始化,可在页面退出时调用
          setTimeout(function(){//人脸识别成功后 进行支付
			        that.payNext();
		      },2000);
		      return;
        }
      }else if(returnData == -2){
        this.leftTips = '未检测到人脸！';
        setTimeout(function() {
          that.compareNum();
        }, 1500);
      }else if(returnData == -3 || returnData == -4){
        this.leftTips = '人脸位置不合格！';
        setTimeout(function() {
          that.compareNum();
        }, 1500);
      }else if(returnData == -5){
        this.leftTips = '人脸特征值提取失败！';
        setTimeout(function() {
          that.compareNum();
        }, 1500);
      }else if(returnData == -6){
        this.leftTips = '照片中人脸检测失败！';
        setTimeout(function() {
          that.compareNum();
        }, 1500);
      };
    },
    payNext(){
      this.isIdentifyFace = true;
      this.siteStepText.map((val,key) => {
        (key <= 2) ? val.selectClass = true : val.selectClass = false;
        return val;
      })
    },
    notMyselfHandle(){//不是本人
      this.ISME = false;
    },
    myselfHandle(){//是本人
      this.ISME = true;
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#VerifyIdentity {
  .myself{
    width:80px;
    float: left;
    color: #FAFAFB;
    font-size:16px;
    top: 300px;
    left: 190px;
    position:absolute;
    .isMeBg{
      background:#F39800;
      border: 1px solid #F39800;
    }
    > span{ 
      width:80px;
      height:30px;
      float: left;
      text-align:center;
      line-height:30px;
      border:1px solid #03D4E7;
      border-radius: 5px;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .verifyContent{
    float: left;
    margin-left:30px;
    // position: relative;
    .selectPeople{
      margin: 112px 0 0 30px;
      color: #F8F9FB;
      > img{
        width:56px;
        height:56px;
        float: left;
        margin-top:18px;
      }
      .titleRight{
        float:left;
        margin-left:18px;
        > span{
          font-size: 26px;
        }
        .selectBorder{
          background:#F39800;
          border: 1px solid #F39800;
        }
        >ul{
          margin-top:10px;
          li{
            font-size: 16px;
            float: left;
            width:40px;
            height:30px;
            border: 1px solid #03D4E7;
            line-height: 30px;
            text-align:center;
            border-radius:5px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      } 
    }
    .msg{
      margin-top:26px;
      > div{
        float: left;
        width:220px;
        height:300px;
        background:rgba(3, 231, 231, 0.25);
        border-radius: 14px;
        border:1px solid rgba(243,152,0, 0.4);
        margin-right:40px;
        color: #F8F9FB;
        .el-button{
          margin-top:26px;
        }
        > p {
          font-size:20px;
          text-align: center;
          margin:14px 0;
        }
        >span img{
          width:190px;
          height:218px;
          margin:0 15px 4px 15px;
        }
      }
      .opacity{
        opacity:0.2;
      }
      .orderDetail{
        margin-right: 0px;
        > img{
          width:190px;
          height:114px;
          border-radius: 10px;
          margin: 0 15px 4px 15px;
        }
        > label{
          font-size:12px;
          text-align: left;
          float: left;
          width:110px;
          height:26px;
          line-height: 26px;
          border:1px solid #03D4E7;
          border-radius:5px;
          margin:6px 50px 0 50px;
          padding-left:10px;
        }
        > span{
          float: left;
          font-size: 12px;
          border:1px solid #03D4E7;
          width:160px;
          height: 30px;
          line-height:30px;
          text-align: left;
          margin:12px 24px 0 24px;
          border-radius: 6px;
          padding-left: 10px;
        }
      }
      @keyframes fideOut{ 
        0%{
          opacity:0;
        }
        50%{
          opacity:0.5;
        }100%{
          opacity: 1;
        }
      }
      .camera{
        width: 500px;
        height: 440px;
        position: absolute;
        top: 88px;
        left: calc(50% - 250px);
        animation:fideOut 0.5s ease-in-out backwards;
        // background:rgba(0,0,0,0.8);
        .faceRecognition{
          width: 270px;
          height: 370px;
          margin: 20px 104px;
          background: rgba(255, 255, 255, 0.25);
          opacity: 1;
          border-radius: 10px;
          padding: 15px;
          > div{
            width: 270px;
            height: 370px;
            background: #FFFFFF;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
          }
        }
        .pay{
          width:494px;
          height:352px;
          background:rgba(0,0,0,0.8);
          margin-top:64px;
          padding-top:26px;
          .payBorder{
            width:200px;
            height:282px;
            padding: 8px;
            color: #FBFEFE;
            font-size: 20px;
            background:#FBFEFE;
            border-radius: 5px;
            text-align:center;
            margin:0px 152px 0 152px;
            div:first-child{
              background:#23A93A;
              width:200px;
              height: 220px;
              border-radius: 5px 5px 0 0;
              > p{
                display:inline-block;
                margin: 14px 0;
              }
              .weChatPay{
                width:144px;
                height: 144px;
                background:url('~@/assets/images/weBorder.png') center center no-repeat;
                background-size: cover;
                padding:6px;
                margin: 0px 20px 0px 22px;
                > img{ 
                  width:100%;
                  height: 100%;
                  border-radius: 4px;
                }
              }
            }
            div:last-child{
              width:200px;
              height:50px;
              color: #012625;
              background:#F39700;
              border-radius: 0 0 5px 5px;
              margin-top:14px;
              line-height: 50px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
