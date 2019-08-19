<!--团队入住-->
<template>
  <div id="GroupRoom" class="contentView">
    <DisclaimerContent></DisclaimerContent>
    <StepTips :siteStepText="siteStepText"></StepTips>
    <div class="leftTips">
      <div class="tipsBox">
        <span>{{leftTips}}</span>
      </div>
      <div class="tipsIcon"></div>
    </div>
    <div class="findorder">
      <div class="orderType">
        <ul>
          <li :class="{selectBg:isSelectBg}" @click="searchByName()">团名查询</li>
          <li :class="{selectBg:!isSelectBg}" @click="searchByID()">身份证查询</li>
        </ul>
      </div>
      <div class="searchOrder" v-if="isSelectBg">
        <div>
          <el-table :data="tableData" height="268" border style="width: 100%">
            <el-table-column prop="group" label="团名" width="228"></el-table-column>
            <el-table-column prop="name" label="导游名" width="120"></el-table-column>
            <el-table-column label="办理入住" width="137">
              <template slot-scope="scope">
                <span @click="handleEdit(scope.$index, scope.row)" class="Btn">确定办理</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="searchIdCard" v-else>
        <div>
          <p>请扫描身份证</p>
          <img src="../../assets/images/idCard.gif" >
        </div>
        <el-button v-if="!config.IsValid" type="success" @click="handleCard">下一步</el-button>
      </div>
      <div class="checkCode" v-if="checkCode">
        <div>
          <img src="../../assets/images/searchIcon.png" />
          <el-input placeholder="请输入验证码" v-model="checkCodeVal" autofocus="autofocus" clearable @focus="show" data-layout="numeric" ></el-input>
          <span @click="submit">提交</span>
        </div>
        <div>
          <vue-touch-keyboard :layout="layout"  :input="input" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import StepTips from "@/components/StepTips"
import DisclaimerContent from "@/components/Content"
import { Button, Table, TableColumn, Input } from "element-ui"
import VueTouchKeyboard from "vue-touch-keyboard"
import style from "vue-touch-keyboard/dist/vue-touch-keyboard.css";
import cfg from "@/config/index.js"
import common from "@/utils/common.js"
import '@/assets/style/common.less';

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(VueTouchKeyboard);

export default {
  name: 'GroupRoom',
  data () {
    return {
      config:cfg,
      leftTips:'',
      siteStepText:this.$store.state.orderStepTextState,
      placeholder:'请填写预订时预留的姓名',
      isSelectBg:true,//true显示姓名查询，false显示身份证查询，
      checkCode:false,//是否有验证码验证
      checkCodeVal:'',//验证码值
      layout: "numeric",
      input: null,
      rowTrData:'',
      tableData: [{
          group: '超能陆战队',
          name: '小朵',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1,
        }, {
          group: '海底小纵队',
          name: 'Alita',
          address: '上海市普陀区金沙江路 1518 弄',
          id:2,
        }, {
          group: '海底小纵队',
          name: 'Alita',
          address: '上海市普陀区金沙江路 1518 弄',
          id:3,
        }, {
          group: '超能陆战队',
          name: '小朵',
          address: '上海市普陀区金沙江路 1518 弄',
          id:14,
        }, {
          group: '海底小纵队',
          name: 'Alita',
          address: '上海市普陀区金沙江路 1518 弄',
          id:5,
        }, {
          group: '海底小纵队',
          name: 'Alita',
          address: '上海市普陀区金沙江路 1518 弄',
          id:6,
        }, {
          group: '超能陆战队',
          name: '小朵',
          address: '上海市普陀区金沙江路 1518 弄',
          id:7,
        }]
    }
  },
  created () {
    this.$store.commit("changeStatus", false);//隐藏上一页的按键
    this.$store.commit("changeHomeStatus", true);//展示首页的按键
    this.siteStepText.map((val,key) => {
      (key <= 0) ? val.selectClass = true : val.selectClass = false;
      return val;
    });
    cfg.peopleData.length = 0;
  },
  methods: {
    searchByName(){
      this.isSelectBg = true;
      cfg.peopleData.length = 0;
    },
    searchByID(){
      const that = this;
      this.isSelectBg = false;
      cfg.peopleData.length = 0;
      that.getDistingMark();
    }, 
    handleCard(){//身份证查询
      this.$router.push('roomTypeGP');
    }, 
    getDistingMark(){//读卡识别返回信息
      let rst = '';
      rst = common.handleCard();
      if(rst == 0x90){
        this.leftTips = "身份扫描成功，已查询到订单！";
        common.getPeopleMsg();
        console.log(cfg.peopleData);
      }else if(rst==0x02){
        this.leftTips = "请重新将卡片放到读卡器上！";
        this.getDistingMark();
      }else if(rst==0x41){
   			this.leftTips = "读取数据失败！";
        this.getDistingMark();
      }
    },
    handleEdit(index,row){
      console.log(row);
      this.rowTrData = row;
      // this.$router.push({path:'roomTypeGP',query:{id:row.id}});
      this.checkCode = true;
    }, 
    submit(){
      const that = this;
      this.$router.push({path:'roomTypeGP',query:{id:that.rowTrData.id}});
    },
    show(e) {
      this.input = e.target;
      this.layout = e.target.dataset.layout;
    },
  },
  computed: {},
  watch: {},
  props: [ ],
  components: { StepTips, DisclaimerContent }
}
</script>

<style lang="less">
#GroupRoom {
  .selectBg{
    background:#03E7E7;
    color: #013F3D!important;
  }
  .findorder{
    position:relative;
    float:left;
    margin:114px 0 0 60px;
    .orderType{
      margin-left: 44px;
      > ul li:first-child{
        border-radius: 12px 0 0 12px;
        cursor: pointer;
      }
      > ul li:last-child{
        border-radius:0 12px 12px 0;
        cursor: pointer;
      }
        li{
        color: #FAFAFB;
        font-size: 26px;
        display: inline-block;
        height:58px;
        width:196px;
        text-align: center;
        border:1px solid #02FBE7;
        line-height: 58px;
      }
    }
    .searchOrder{
      width:486px;
      height:268px;
      background:rgba(3,212,231,0.2);
      margin:20px 0 0 -28px;
      padding: 20px 32px;
      border-radius: 10px;
      .Btn{
        display:inline-block;
        width:80px;
        height:22px;
        line-height:23px;
        text-align: center;
        color: #FAFAFB;
        font-size: 14px;
        border-radius:6px;
        border:1px solid #F39800;
        cursor: pointer;
      }
      .el-table, .el-table__expanded-cell,.el-table th, .el-table tr{
         background:none;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background:rgba(3,212,231,0.2);
      }
      .el-table{
        font-size:14px;
        color: #51FBFB;
      }
      .el-table td, .el-table th{
        text-align: center;
      }
      .el-table thead{
        font-size:20px;
        color: #51FBFB;
      }
      .el-table__empty-text{
        color: #51FBFB;
      }
      .el-table td, .el-table th.is-leaf{
        border-bottom: 1px solid #00FFFF;
      }
      .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-right:1px solid #00FFFF;
      }
      .el-table--border, .el-table--group{
        border: 1px solid #00FFFF;
      }
      .el-table{
        position:static;
      }
      .el-table--scrollable-x .el-table__body-wrapper{
        overflow-x:hidden;
      }
      > div{
        width: 100%;
        height: 100%;
      }
    }
    .searchIdCard{
      > div{
        padding:2px 0 0 0;
        width:220px;
        height:298px;
        background:rgba(3,212,231,0.25);
        border-radius: 4px;
        margin:32px 0 0 136px;
        > p{
          color:#F8F9FB;
          font-size:20px;
          text-align: center;
          margin:16px 0;
        }
                > img{
          width:190px;
          height:218px;
          margin:0 15px 0;
        }
      }
    }
    .checkCode{
      position: absolute;
      width: 554px;
      height: 388px;
      background: rgba(0,0,0,0.9);
      top: 0px;
      z-index: 9;
      left: -30px;
      padding: 40px 99px 0 99px;
      > div:first-child{
        .el-input{ 
          width: 200px;
          height: 50px;
          color: #FAFCFC;
          font-size: 18px;
        }
        .el-input__inner{
          background: none;
          border: 1px solid #02FBE7;
          width: 200px;
          height: 50px;
          border-radius: 10px;
        }
        >img{
          width:56px;
          height:57px;
          float: left;
          margin:-4px 16px 0 0;
        }
        > span{
          display:inline-block;
          width:64px;
          height:45px;
          color: #012625;
          font-size:18px;
          background:#F39800;
          line-height:45px;
          text-align: center;
          border-radius:10px;
          margin-left:20px;
          cursor: pointer;
        }
      }
      > div:last-child{
        width:248px;
        height:218px;
        margin:40px 0 0 50px;
        .line:last-child{
          .key:nth-child(-n+3){
            display:none;
          }
          .key:nth-child(4){
            flex:88 1 0%!important;
          }
          .next ,.accept {
            display:none;
          }
        }
        .backspace{
          margin-right:0;
        }
        .vue-touch-keyboard .keyboard .key{
          background-color:#F39800;
          color:#fff;
          font-size:20px;
          border:none;
        }
      }
    }
  }
}
</style>
