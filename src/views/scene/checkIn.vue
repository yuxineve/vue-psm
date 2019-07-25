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
        <div class="bundle clearfix addHeight">
          <div class="dayNumImg"></div>
          <div class="selectDate">
            <span>请选择入住天数</span>
            <div class="selectNum">
              <ul class="clearfix">
                <li v-for="(item,index) in selectNumD" :key="index" :class="{'active':IsActiveD == index}" @click="handleActiveD(index)">{{item}}</li>
              </ul>
              <label v-show="IsActiveD == 5">
                <el-date-picker
                  v-model="dateValue"
                  type="daterange"
                  @change="changeDate"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </label>
            </div>
          </div>
        </div>
        <div class="bundle clearfix">
          <div class="roomPrice">
            <div class="priceTitle"><label>价格表</label></div>
            <div class="priceDate">
              <div v-for="(item,index) in priceDetail" :key="index">
                <label>{{item.date}}</label>
                <span>￥ {{item.price}}</span>
              </div>
            </div>
          </div>
          <div class="sureBtn">
            <router-link :to="{ name: 'VerifyIdentidy'}">
              <el-button type="warning" class="makeSureRoomed">确认入住</el-button>
            </router-link>
            <el-button>总价：{{totlePrice}}元</el-button>
          </div>
        </div>
      </div>
      <div class="roomImg">
        <div>
          <el-carousel :interval="5000" arrow="always" indicator-position="outside" height="13.8rem">
            <el-carousel-item v-for="(item,index) in cardImg" :key="index">
              <img :src="item.img">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <div class="roomTitle"><span>主题房</span></div>
          <div class="roomImgDetail">
            <div class="threeMsg">
              <div>
                <span>宽带：</span>
                <label>wifi</label>
              </div>
              <div>
                <span>早餐：</span>
                <label>无</label>
              </div>
              <div class="vehicle">
                <span>政策：</span>
                <label>我可真是个机智的小可爱啊</label>
              </div>
            </div>
            <div class="remark clearfix">
              <span>备注：</span>
              <span>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import '@/assets/style/common.less';
import StepTips from "@/components/StepTips"
import { Button, Carousel, CarouselItem, DatePicker,  } from "element-ui"

Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(DatePicker);

export default {
  name: 'CheckIn',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      totlePrice:'3000',
      dateValue:'',
      selectNumP:['1人','2人','3人','4人'],
      selectNumD:['1天','2天','3天','4天','5天','其他'],
      priceDetail:[{
        date:'7月23日',
        price:300,
      },{
        date:'7月23日',
        price:400,
      },{
        date:'7月23日',
        price:200,
      },{
        date:'7月23日',
        price:300,
      },{
        date:'7月23日',
        price:300,
      }],
      IsActiveP:0,//选择人数
      IsActiveD:0,
      cardImg:[
        { 
          img: require("@/assets/images/adImgLevel-2/ad1.jpg"), 
          title:'1'
        },{
          img: require("@/assets/images/adImgLevel-2/ad2.jpg"), 
          title:'1'
        },{
          img: require("@/assets/images/adImgLevel-2/ad3.jpg"), 
          title:'1'
        }],
        pickerOptions:{
          disabledDate (time) {
              return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
          },
        }
    }
  },
  created () {
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
  },
  methods: {
    handleActiveP(index){//选择人数
      this.IsActiveP = index;
    },
    handleActiveD(index){//选择天数
      this.IsActiveD = index;
    },
    changeDate(){
        console.log('dateValue:',this.dateValue)
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
  .roomMsg,.roomMsg > div,.bundle> div,.selectNum li,.sureBtn .el-button{
    float: left;
  }
  .roomMsg{
    color: #F8F9FB;
    margin: 11rem 0 0 6rem;
    .peopleoImg,.dayNumImg{
      width: 5.6rem;
      height:5.6rem;
      background:#03C3C3;
      border-radius: 1rem;
    }
    .selectPeople,.selectDate{
      margin-left:1rem;
      > span{
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
      .selectNum > label{
        width:28.8rem;
        height:3rem;
        font-size: 1.8rem;
        border:.1rem solid #F39800;
        border-radius: .5rem;
        margin-top:.7rem;
        display:inline-block;
        padding: .2rem .4rem;
        .el-date-editor--daterange.el-input__inner{
          width: 100%;
          color: #F8F9FB;
        }
        .el-date-editor .el-range__icon,.el-date-editor .el-range__close-icon{
          line-height:2.4rem;
        }
        .el-input__inner{
          background:none;
          border:none;
          height:3rem;
          line-height: 3rem;
        }
        input{
          background:none;
          color: #F8F9FB;
        }
        .el-date-editor .el-range-separator{
          color: #F8F9FB;
          line-height: 2.4rem;
        }
      }
    }
    .roomPrice{
      background:rgba(3,212,231,0.25);
      width:19.6rem;
      height:20rem;
      border-radius: 1rem;
      .priceTitle{
        width:100%;
        font-size:2rem;
        text-align: center;
        padding: 0.6rem 0;
      }
      .priceDate{
        height: 15rem;
        overflow-y: auto;
        margin:.6rem .7rem;
      }
      .priceDate > div > label,.priceDate > div > span{
        border:.1rem solid #03D4E7;
        border-radius: .5rem;
        display:inline-block;
        width:7.6rem;
        height:3rem;
        text-align: center;
        line-height: 3rem;
        margin: 0 1.2rem .6rem 0;
        font-size:1.8rem;
      }
      .priceDate > div > span{ 
        color:#F39800;
      }
    }
  }
  .bundle{
    margin-bottom: 2.5rem;
  }
  .addHeight{
    height:11.4rem;
    position:relative;
    // .selectCalinder{
    //   width: 30rem;
    //   height: 24rem;
    //   background: #03E7E7;
    //   position: absolute;
    //   border: 0.1rem solid #F39800;
    //   border-radius: 1rem;
    //   top: -10rem;
    //   left: 38rem;
    //   z-index: 99;
    // }
  }
  .sureBtn{
    width: 13rem;
    text-align: center;
    padding: 4rem;
    .el-button+.el-button{
      margin-left:0rem;
    }
    .el-button{
      width:14.2rem;
      height: 4.8rem;
      margin-top:2rem;
      font-size: 2rem;
    }
  }
  .sureBtn .el-button:first-child{
    color: #012625;
    
  }
  .sureBtn .el-button:last-child{
    font-size:1.8rem!important;
    background: none;
    color: #fff;
    border:.1rem solid #F39800;
  }
  .roomImg{
    background:rgba(3,212,231,0.4);
    width:25rem;
    height: 32rem;
    border-radius:1rem;
    margin:7rem 0 0 4rem;
    img{
      width:100%;
      height:100%;
    }
    .el-carousel__arrow{
      width:2rem;
      height:2rem;
    }
    .el-carousel__button{
      width:1.8rem;
    }
  }
  .roomImg > div:first-child{
    padding:1rem 1rem 0 1rem;
    overflow: hidden;
    .el-carousel div{
      width: 23rem;
      border-radius: 1rem;
    }
  }
  .roomImg > div:last-child{ 
    color: #FAFAFB;
    .roomTitle{
      font-size:2rem;
      width:100%;
      text-align:center;
    }
  }
  .roomImgDetail > div{
    float:left;
    width:10.2rem;
    height: 9.2rem;
  }
  .roomImgDetail > div:first-child{
    margin-right:1.4rem;
  }
  .roomImgDetail > div:last-child{
    border:.1rem solid #03D4E7;
    border-radius: .5rem;
  }
  .roomImgDetail{
    margin:1rem 0 0 1.5rem;
    .threeMsg div{
      width: 10rem;
      height:2.3rem;
      border: 1px solid #03D4E7;
      border-radius: .5rem;
      margin-bottom: .4rem;
      line-height: 2.3rem;
      padding:.2rem .6rem;
      span{
        font-size:1.2rem;
      }
      label{
        font-size: 1rem;
      }
    }
    .threeMsg div.vehicle{
      > span, > label{
        float:left;
      }
      > label{
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 5.8rem;
        overflow: hidden;
      }
    }
    .remark{
      overflow: hidden;
      padding: .5rem;
      > span:first-child{
        font-size:1.2rem;
      }
      > span:last-child{
        font-size:1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
    }
  }
  .makeSureRoomed{
    background:#F39800!important;
    color: #012625!important;
  }
}
</style>
