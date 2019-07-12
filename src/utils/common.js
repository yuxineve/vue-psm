import Vue from "vue";
import { Message } from "element-ui";
import cfg from "@/config/index.js";

Vue.use(Message);

const getPeopleMsg = peopleData => {
  console.log(cfg);
  // if (!cfg.IsValid) {
  //     var currentCardNo = '460102199312141554';
  //     var NameL = "yuxin";
  //     var Image = null;
  //     var SexL = "男";
  //     var NationL = "汉";
  //     var Born = "19931214";
  //     var Address = "海口市美兰区人民东里61号";
  // } else {
  //     var currentCardNo = embedObj.CardNo();
  //     var NameL = embedObj.NameL();
  //     var Image = embedObj.GetImage();
  //     var SexL = embedObj.SexL();
  //     var NationL = embedObj.NationL();
  //     var Born = embedObj.Born();
  //     var Address = embedObj.Address();
  // };
  // if (peopleData.length > 0){
  //     peopleData.map(function (item, index) {//校验身份证是否已经办理
  //         if (item.kw1 == currentCardNo) {
  //             console.log(this)
  Message({
    message: "入住人录入重复,请更换新的身份证进行验证",
    type: "success"
  });
  //                // $('.li-sec p').html('入住人录入重复，请更换新的身份证进行验证');
  //                 getreadCard();
  //         }else{

  //         }
  //     })
  // }
};

const common = {
  getPeopleMsg: getPeopleMsg
};
export default common;
