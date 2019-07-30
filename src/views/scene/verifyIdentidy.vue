<!--验证身份-->
<template>
  <div id="VerifyIdentidy" class="contentView">
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="boxFlex" :class="{opacityHidden:isOpacity}">
      <div class="title"><span>身份证扫描</span></div>
      <div class="img" v-if="!isIdentifyIDCard">
        <img :src="IDCardImg"/>
      </div>
      <div class="img" v-if="isIdentifyIDCard">
        <div class="IDCardImged"><img :src="IDCardImged"/></div>
        <div class="IDCardDetail">
          <span>姓&#12288;名：{{name}}</span>
          <span>身份证：{{IDCard}}</span>
        </div>
      </div>
    </div>
    <div class="boxFlex" :class="{opacityHidden:isOpacity}">
      <div class="title"><span>人脸识别</span></div>
      <div class="img">
        <img :src="faceImg"/>
      </div>
      <el-button type="success" v-if="!config.IsValid" @click="facedNext">录入人脸</el-button>
    </div>
    <div class="camera"  :class="{visibility:!(isOpacity && isIdentifyFace)}">  
      <div><span></span></div>
      <div class="faceRecognition">
        <div>
          <img :src="faceImg" :class="{display:displayFaceImg}"/>
          <embed id="RoutonReader" :class="{display:!displayFaceImg}" type="application/mozilla-npruntime-scriptable-plugin" width="100%" height="100%" />
        </div>
      </div>
      <el-button style="margin:10px 0 0 280px" type="success" v-if="!config.IsValid" @click="payNext">请支付</el-button>
    </div>
    <div v-if="isOpacity && !isIdentifyFace" class="weChatPay">
      <div>
        <div><span>请使用微信扫描支付</span></div>
        <div class="wePayBorder">
          <img src="../../assets/images/wechat.png"/>
        </div>
      </div>
      <router-link :to="{name : 'MakeCard'}">
        <el-button type="warning">完成支付</el-button>
      </router-link>
    </div>
    <div class="boxFlex" style="background:rgba(3, 231, 231, 0.4)">
      <span v-if="!isIdentifyFace">
        <div class="title"><span>订单详情</span></div>
        <div class="img" style="overflow:visible">
          <div class="orderImg"><img :src="orderImg"/></div>
          <div class="orderDetail" style="padding:12px 40px;width:100px;">
            <span>房型：主题房</span>
            <span>房间：主题房</span>
            <span>总价：主题房</span>
          </div>
        </div>
      </span>
      <span v-else>
        <div class="cameraPosition">
          <div class="title"><span>摄像头位置</span></div>
          <div class="img">
            <img :src="faceImg"/>
          </div>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import '@/assets/style/common.less';
import Vue from "vue"
import StepTips from "@/components/StepTips"
import { Button } from "element-ui"
import cfg from "@/config/index.js"
import common from "@/utils/common.js"

Vue.use(Button);

export default {
  name: 'VerifyIdentidy',
  data () {
    return {
    	leftTips:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      config:cfg,
      isOpacity:false,//暗化人脸识别和身份证模块
      siteStepText:this.$store.state.siteStepTextState,
      IDCardImg:require("@/assets/images/1.jpg"),
      IDCardImged:require("@/assets/images/1.jpg"),//身份证识别照片
      faceImg:require("@/assets/images/1.jpg"),
      orderImg:require("@/assets/images/1.jpg"),
      isIdentifyFace:false,//人脸是否识别完成
      isIdentifyIDCard:false,//IDCard是否识别完成
      name:'',
      IDCard:'',
      displayFaceImg:true,//是否隐藏识别的人脸照片
    }
  },
  created () {
    cfg.peopleData = [];
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {//step
      (key <= 2) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
  },
  mounted(){
  	const that = this;
		setTimeout(function(){	
      that.getDistingMark();
      const reg = new RegExp('base64');
	    if(reg.test(that.IDCardImged)){
	    	const len = cfg.peopleData.length;
	      cfg.peopleData.map((val,key,arr) => {
	        if(len == (key+1)){
	          that.name = common.sensitString(val.name,0,1,'*');
	          that.IDCard = common.sensitString(val.idCard,4,4,'*');
	          that.isIdentifyIDCard = true;
	          setTimeout(function(){
	          	if(cfg.IsValid){//有硬件时 录入人脸
		            that.facedNext();
		          }
	          },1000)
	        }
	      });
    	}
    },1000)
  },
  methods: {
    facedNext(){
      const that = this;
      this.leftTips = '请对准摄像头';
      this.isOpacity = true;
      this.isIdentifyFace = true;
      let flag = this.compareNum();
      if(flag){
      	setTimeout(function(){//人脸识别成功后 进行支付
		        that.payNext();
	      },2000)
      }
    },
    payNext(){//绑定支付，扫二维码
      this.isOpacity = true;
      this.isIdentifyFace = false;
      this.siteStepText.map((val,key) => {
        (key <= 3) ? val.selectClass = true : val.selectClass = false;
        return val;
      })
    },
    getDistingMark(){//读卡识别返回信息
      let flag = '';
      flag = common.handleCard();
      if(flag == 0x90){
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
    compareNum(){//对人脸识别后的返回值，进行比较
      let compareFlag = false;
      const returnData = common.faceVideoComp();
      if(returnData > 0){//成功比对出分值
        if(returnData < cfg.similar){
          this.leftTips = '人脸匹配低于' + cfg.similar*100 + '%' + ' 请重新验证';
        }else{
          this.leftTips = '相似对比度为：'+valRet.toFixed(2)*100+'%,请支付绑定该订单！';
          var len = cfg.peopleData.length;
	        cfg.peopleData.map((val,key) => {
	          if (len == (key + 1)) {
	            val.faceImg = embedObj.GetBase64Img("D:\\zjphoto\\face.jpg"); //人脸图像64编码
	            val.faceSimilar =  valRet.toFixed(2);//人脸识别相似度
	          }
          });
          //将图片转成base64编码显示到页面
          this.faceImg = 'data:image/bmp;base64,' + embedObj.GetBase64Img("D:\\zjphoto\\face.jpg");
          this.displayFaceImg = false;
          embedObj.FaceCloseVideo();//关闭摄像头
          embedObj.FaceRelease();//释放人脸库初始化,可在页面退出时调用
          compareFlag = true;
        }
      }else if(returnData == -2){
        this.leftTips = '未检测到人脸！';
        setTimeout(function() {
          this.compareNum();
        }, 1500);
      }else if(returnData == -3 || returnData == -4){
        this.leftTips = '人脸位置不合格！';
        setTimeout(function() {
          this.compareNum();
        }, 1500);
      }else if(returnData == -5){
        this.leftTips = '人脸特征值提取失败！';
        setTimeout(function() {
          this.compareNum();
        }, 1500);
      }else if(returnData == -6){
        this.leftTips = '照片中人脸检测失败！';
        setTimeout(function() {
          this.compareNum();
        }, 1500);
      };
      return compareFlag;
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips }
}
</script>

<style lang="less">
#VerifyIdentidy {
  @keyframes spillIn{ 
    0%{
      opacity:0;
    }
    50%{
      opacity:0.5;
    }100%{
      opacity: 1;
    }
  }
  .opacityHidden{
    opacity:0.2;
  }
  .display{ 
    display: none;
  }
  .visibility{
  	visibility: hidden;
  }
  .boxFlex{
    width:220px;
    height:300px;
    background:rgba(3, 231, 231, 0.25);
    border-radius: 14px;
  }
  .boxFlex{
    float:left;
    margin-left:40px;
    > .el-button--success{
      margin-top:40px;
    }
    .title{
      width:100%;
      color: #F8F9FB;
      font-size: 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    .img{
      width:190px;
      height: 218px;
      border-radius: 10px;
      overflow: hidden;
      margin:5px 0 0 15px;
      > img{ 
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .orderImg,.IDCardImged{
        width:190px;
        height:114px;
        border-radius: 10px;
        overflow: hidden;
        > img{
          width:100%;
          height: 100%;
        }
      }
      .orderDetail,.IDCardDetail{
        width: 100%;
        height: 100px;
        padding:2px 40px;
        > span{
          display: inline-block;
          width:90px;
          height:26px;
          border: 1px solid #03D4E7;
          font-size: 12px;
          color:#FAFAFB;
          border-radius: 5px;
          line-height: 26px;
          margin-bottom: 6px;
          padding:0 5px;
        }
      }
      .IDCardDetail{
        padding:24px 3px 2px;
        > span{
          width: 170px;
          margin-bottom: 12px;
        }
      }
    }
  }
  .boxFlex,.leftTips{
    margin-top: 158px;
  }
  .camera{
    width:520px;
    height:352px;
    position: absolute;
    top: 132px;
    left: calc(50% - 260px);
    :first-child{
      width:100%;
      text-align: center;
      color: #FBFEFE;
      font-size: 20px;
    }
    .faceRecognition{
      width:348px;
      height:228px;
      margin:20px 70px;
      background:rgba(255,255,255,0.25);
      opacity: 1;
      border-radius: 10px;
      padding:15px;
      > div{
        width:348px;
        height:228px;
        background: #FFFFFF;
        border-radius:10px;
        position: relative;
        overflow: hidden;
        > img{
          width:100%;
          height: 100%;
        }
        /*#Reader{
          opacity:0;
        }*/
      }
    }
  }

  .weChatPay{
    position: absolute;
    background: #FBFEFE;
    width: 200px;
    height: 282px;
    border-radius: 5px;
    top: 155px;
    left: calc(50% - 104px);
    padding:8px;
    > div{
      width: 200px;
      height: 220px;
      background: #23A93A;
      margin-bottom: 14px;
      border-radius: 5px 5px 0 0;
      > div{
        color:#FBFEFE;
        font-size: 20px;
        text-align: center;
        padding: 10px 0;
      }
    }
    .wePayBorder{
      width: 150px;
      height:150px;
      background:url(~@/assets/images/weBorder.png) center center no-repeat;
      background-size: cover;
      padding:0;
      margin: 5px 24px;
      > img{ 
        width:90%;
        height:90%;
        margin-top:6px;
      }
    }
    .el-button--warning{
      width: 100%;
      color: #012625;
      background:#F39700;
    }
    .el-button{ 
      padding:17px 20px;
      border-radius:0 0 5px 5px;
    }
  }
}
</style>
