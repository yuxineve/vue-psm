// import Vue from "vue";
// import { Message } from "element-ui";

// Vue.use(Message);

const getPeopleMsg = peopleData => {
  console.log(11);
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
  // Message({
  //   message: "入住人录入重复,请更换新的身份证进行验证",
  //   type: "success"
  // });
  //                // $('.li-sec p').html('入住人录入重复，请更换新的身份证进行验证');
  //                 getreadCard();
  //         }else{

  //         }
  //     })
  // }
};
/* 敏感字符串替换
* str 需要处理的字符串
* frontLen 保留的前几位
* endLen 保留的后几位
* cha 替换的字符串
*/
const sensitString = (str, frontLen, endLen, cha) => {
  const len = str.length - frontLen - endLen;
  let star = '';
  for(let i=0; i<len; i++){
    star += cha;
  }
  const a = str.substring(0, frontLen) + star + str.substring(str.length - endLen);
  return a;
}
const common = {
  getPeopleMsg: getPeopleMsg,
  sensitString: sensitString
};
export default common;
