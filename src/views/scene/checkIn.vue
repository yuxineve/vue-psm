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
              <div v-if="priceDetail.length == 0" class="noPrice">暂无近期房价~</div>
              <div v-else v-for="(item,index) in priceDetail" :key="index">
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
        <div class="elCarousel">
          <el-carousel :interval="5000" arrow="always" indicator-position="outside" height="138px">
            <el-carousel-item v-for="(item,index) in roomTypeMsg.imgs" :key="index">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <div class="roomTitle"><span>主题房</span></div>
          <div class="roomImgDetail">
            <div class="threeMsg">
              <div>
                <span>宽带：</span>
                <label>{{roomTypeMsg.broadBand}}</label>
              </div>
              <div>
                <span>早餐：</span>
                <label>{{roomTypeMsg.breakfast}}</label>
              </div>
              <div class="vehicle">
                <span>政策：</span>
                <label>{{roomTypeMsg.policy}}</label>
              </div>
            </div>
            <div class="remark clearfix">
              <span>备注：</span>
              <span>{{roomTypeMsg.remark}}</span>
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
import { Button, Carousel, CarouselItem, DatePicker, Message } from "element-ui"

Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(DatePicker);

export default {
  name: 'CheckIn',
  data () {
    return {
      siteStepText:this.$store.state.siteStepTextState,
      totlePrice:' / ',
      dateValue:'',
      selectNumP:['1人','2人','3人','4人'],
      selectNumD:['1天','2天','3天','4天','5天','其他'],
      roomTypeMsg:"",
      priceDetail:[],
      IsActiveP:0,//选择人数
      IsActiveD:0,
      pickerOptions:{
        disabledDate (time) {
            return time.getTime() < new Date(new Date().toLocaleDateString()).getTime();
        },
      }
    }
  },
  created () {
    const that = this;
    this.$store.commit("changeStatus", true);//展示上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 1) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    this.getRoomTypeMsg();
    this.getRoomPrice(5);
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
    },
    getRoomTypeMsg(){//获取房型信息
      const that = this;
      const params = {
        "roomTypeId":this.$route.query.id
      }
      this.VueAxios(this.ServeApi.getThisRTScene, "" ,params )
      .then(res => {
        if(res.code == 200){
          that.roomTypeMsg = res.data;
        }else{
          Message({
            message: res.msg,
            type: 'warning'
          });
        }
      });
    }, 
    getRoomPrice(dayNum){
      const that = this;
      const params = {
        "roomTypeId":this.$route.query.id,
        "day":dayNum,
      }
      this.VueAxios(this.ServeApi.getPriceByDayScene,"",params)
      .then(res => {
        console.log(res);
        if(res.code == 200) {
          that.totlePrice = res.data.totalPrice;
          res.data.priceTable.map((item,index) => {
            let year = item.time.split(' ')[0].split('-');
            item.date = year[1] + '月' + year[2] + '日';
          });
          that.priceDetail = res.data.priceTable;
        }else{
          Message({
            message: res.msg,
            type: 'warning'
          });
        }
      })
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
    margin-top:156px;
  }
  .roomMsg,.roomMsg > div,.bundle> div,.selectNum li,.sureBtn .el-button{
    float: left;
  }
  .roomMsg{
    color: #F8F9FB;
    margin: 110px 0 0 60px;
    .peopleoImg{
      background:url('~@/assets/images/peopleNum.png') center center no-repeat;
      background-size: cover;
    }
    .dayNumImg{
      background:url('~@/assets/images/selectDay.png') center center no-repeat;
      background-size: cover;
    }
    .peopleoImg,.dayNumImg{
      width: 56px;
      height:56px;
      border-radius: 10px;
    }
    .selectPeople,.selectDate{
      margin-left:10px;
      > span{
        font-size: 26px;
      }
      .selectNum{
        margin-top: 10px;
      }
      .selectNum li{
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #03D4E7;
        width:40px;
        height:30px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        cursor: pointer;
      }
      .selectNum > label{
        width:288px;
        height:30px;
        font-size: 18px;
        border:1px solid #F39800;
        border-radius: 5px;
        margin-top:7px;
        display:inline-block;
        padding: 2px 4px;
        .el-date-editor--daterange.el-input__inner{
          width: 100%;
          color: #F8F9FB;
        }
        .el-date-editor .el-range__icon,.el-date-editor .el-range__close-icon{
          line-height:24px;
        }
        .el-input__inner{
          background:none;
          border:none;
          height:30px;
          line-height: 30px;
        }
        input{
          background:none;
          color: #F8F9FB;
        }
        .el-date-editor .el-range-separator{
          color: #F8F9FB;
          line-height: 24px;
        }
      }
    }
    .roomPrice{
      background:rgba(3,212,231,0.25);
      width:196px;
      height:200px;
      border-radius: 10px;
      .priceTitle{
        width:100%;
        font-size:20px;
        text-align: center;
        padding: 6px 0;
      }
      .priceDate{
        height: 150px;
        overflow-y: auto;
        margin:6px 7px;
        .noPrice{
          text-align: center;
          padding-top: 30px;
          border: 1px solid #03D4E7;
          border-radius: 4px;
          height: 102px;
          width: 150px;
          margin: 0 16px;
        }
      }
      .priceDate > div > label,.priceDate > div > span{
        border:1px solid #03D4E7;
        border-radius: 5px;
        display:inline-block;
        width:76px;
        height:30px;
        text-align: center;
        line-height: 30px;
        margin: 0 10px 6px 0;
        font-size:16px;
      }
      .priceDate > div > label{
        font-size:16px;
      }
      .priceDate > div > span{ 
        color:#F39800;
      }
    }
  }
  .bundle{
    margin-bottom: 25px;
  }
  .addHeight{
    height:114px;
    position:relative;
  }
  .sureBtn{
    width: 130px;
    text-align: center;
    padding: 40px;
    .el-button+.el-button{
      margin-left:0;
    }
    .el-button{
      width:142px;
      height: 48px;
      margin-top:20px;
      font-size: 20px;
    }
  }
  .sureBtn .el-button:first-child{
    color: #012625;
    
  }
  .sureBtn .el-button:last-child{
    font-size:18px!important;
    background: none;
    color: #fff;
    border:1px solid #F39800;
  }
  .roomImg{
    background:rgba(3,212,231,0.4);
    width:250px;
    height: 320px;
    border-radius:1px;
    margin:70px 0 0 40px;
    .elCarousel{
      height:164px;
    }
    img{
      width:100%;
      height:100%;
    }
    .el-carousel__arrow{
      width:20px;
      height:20px;
    }
    .el-carousel__button{
      width:18px;
    }
  }
  .roomImg > div:first-child{
    padding:10px 10px 0 10px;
    overflow: hidden;
    .el-carousel div{
      width: 230px;
      border-radius: 10px;
    }
  }
  .roomImg > div:last-child{ 
    color: #FAFAFB;
    .roomTitle{
      font-size:20px;
      width:100%;
      text-align:center;
    }
  }
  .roomImgDetail > div{
    float:left;
    width:102px;
    height: 84px;
  }
  .roomImgDetail > div:first-child{
    margin-right:14px;
  }
  .roomImgDetail > div:last-child{
    border:1px solid #03D4E7;
    border-radius: 5px;
  }
  .roomImgDetail{
    margin:10px 0 0 15px;
    .threeMsg div{
      width: 100px;
      height:23px;
      border: 1px solid #03D4E7;
      border-radius: 5px;
      margin-bottom: 4px;
      line-height: 23px;
      padding:2px 6px;
      span{
        font-size:12px;
      }
      label{
        font-size: 10px;
      }
    }
    .threeMsg div.vehicle{
      > span, > label{
        float:left;
      }
      > label{
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 58px;
        overflow: hidden;
      }
    }
    .remark{
      overflow: hidden;
      padding: 5px;
      > span:first-child{
        font-size:12px;
      }
      > span:last-child{
        font-size:10px;
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
