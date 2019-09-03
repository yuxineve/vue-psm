
import cfg from "@/config/index.js"
import {VueAxios, LocalAxios } from "@/utils/api.js"
import ServeApi from "@/utils/serveApi.js"
import { Message } from "element-ui";

const getPeopleMsg = callback => {
  var flag = false;
  var embedObj = document.getElementById("RoutonReader");
  if (cfg.IsValid) {
    var currentCardNo = embedObj.CardNo();
    var NameL = embedObj.NameL();
    var Image = embedObj.GetImage();
    var SexL = embedObj.SexL();
    var NationL = embedObj.NationL();
    var Born = embedObj.Born();
    var Address = embedObj.Address();
  } else {
    var currentCardNo = "460102199312141554";
    var NameL = "yuxin";
    var Image = null;
    var SexL = "男";
    var NationL = "汉";
    var Born = "19931214";
    var Address = "海口市美兰区人民东里61号";
  }
  VueAxios(ServeApi.checkVallidation, { idNumber: currentCardNo }).then(res => {
    if (res.code == 200) {
      if (res.data == 0) {
        var cardArr = {
          name: NameL,
          idCard: currentCardNo,
          img: Image,
          sex: SexL,
          nation: NationL,
          born: Born,
          kw8: "true",
          public: "0", //公安网上传标识 （0-未退 1-已退）
          address: Address
        };
        flag = "data:image/bmp;base64," + Image;
        cfg.peopleData.push(cardArr);
        callback(flag);
        if (cfg.IsValid) {
          setTimeout(faceOpenVideo(), 500);
        }
      } else {
        embedObj.FaceCloseVideo(); //关闭摄像头
        embedObj.FaceRelease(); //释放人脸库初始化    可在页面退出时调用
        handleCard();//重新识别IDCard
        callback(flag);
        return;
      }
    } else {
      callback(flag);
      Message({
        message: res.msg,
        type: "warning"
      });
    }
  });
};

const faceOpenVideo = () => {//打开摄像头
  var embedObj = document.getElementById("RoutonReader");
  embedObj.FaceCloseVideo();
  var ret = embedObj.FaceOpenVideo(0, 270, 370);//0--打开摄像头成功；其它--打开失败
  if(ret == 0){
  	embedObj.FaceRelease(); //先释放人脸库
  	cfg.initFace = embedObj.FaceInit();//初始化,0：成功
  }
}

/* 录入人脸 (人脸识别)*/
const faceVideoComp = (that) => {
		if(cfg.initFace == 0){
	    var embedObj = document.getElementById("RoutonReader");
	    var photoPath = "D:\\zjphoto\\photo.jpg"; //身份证照片路径
      var valRet = embedObj.FaceVideoCompare(photoPath, "D:\\zjphoto\\face.jpg");
      return valRet;
    }else{
    	alert('人脸初始化失败！');
    	faceVideoComp();
			return;
    }
};

/*识别身份证*/
const handleCard = () => {
  var embedObj = document.getElementById("RoutonReader");
  var isInit = false;
  var rst = null; //读卡识别标志
  if (cfg.IsValid) {
    //读取身份证
    embedObj.setPortNum(0);
    if (false == isInit) {
      //设置端口号，1表示串口1，2表示串口2，依此类推；1001表示USB。0表示自动选择
      var port = embedObj.setPortNum(0); //changed args
      if (port == 0) {
        alert("端口初始化失败！");
        return;
      }
      isInit = true;
    }
    embedObj.Flag = 0; //使用重复读卡功能
    var path = "D://zjphoto";
    if (path != "") {
      embedObj.PhotoPath = path;
    } else {
      embedObj.PhotoPath = "";
    }
    rst = embedObj.ReadCard();//读卡
  } else {
    //假设身份证读取成功
    rst = 0x90;
  }
  return rst;
};

/* 敏感字符串替换
 * str 需要处理的字符串
 * frontLen 保留的前几位
 * endLen 保留的后几位
 * cha 替换的字符串
 */
const sensitString = (str, frontLen, endLen, cha) => {
  const len = str.length - frontLen - endLen;
  let star = "";
  for (let i = 0; i < len; i++) {
    star += cha;
  }
  return str.substring(0, frontLen) + star + str.substring(str.length - endLen);
};

const common = {
  getPeopleMsg: getPeopleMsg,
  sensitString: sensitString,
  handleCard: handleCard,//身份证
  faceVideoComp: faceVideoComp,//人脸
  faceOpenVideo:faceOpenVideo
};

export default common;
