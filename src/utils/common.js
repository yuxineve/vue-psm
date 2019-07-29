// import Vue from "vue";
// import { Message } from "element-ui";
import cfg from "@/config/index.js"
// Vue.use(Message);

const getPeopleMsg = () => {
  const embedObj = document.getElementById("RoutonReader");
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
  };
  const infoflag = 0;
  if (cfg.peopleData.length > 0){
    peopleData.map(function (item) {//校验身份证是否已经办理
      if (item.kw1 == currentCardNo) {
          infoflag = 1;//此处提示身份信息重复录入
          embedObj.FaceCloseVideo(); //关闭摄像头
          FaceVideo = 1;
          embedObj.FaceRelease(); //释放人脸库初始化    可在页面退出时调用
          handleCard();
          return;
      }
    })
  };
  if(infoflag == 0){
    const cardArr = {
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
    // document.all['idPhoto'].src = 'data:image/bmp;base64,' + Image;
    cfg.peopleData.push(cardArr);
    if (cfg.IsValid) {
      setTimeout(FaceOpenVideo(), 500);
    }
  }
};

const FaceOpenVideo = () => {//关闭摄像头
  const embedObj = document.getElementById("RoutonReader");
  embedObj.FaceCloseVideo();
  var ret = embedObj.FaceOpenVideo(0, 125, 125);
  FaceVideo = ret;
  embedObj.FaceRelease(); //先释放人脸库
  embedObj.FaceInit();
}

/*重新录入人脸*/
const hint = () => {
  setTimeout(function() {
    $(".li-thi p").html("请侧身正视摄像头");
    FaceVideoComp();
  }, 1500);
}

/* 录入人脸 (人脸识别)*/
const FaceVideoComp = () => {
    let flag = false;
    const embedObj = document.getElementById("RoutonReader");
    var photoPath = "D:\\zjphoto\\photo.jpg"; //身份证照片路径
    var valRet = embedObj.FaceVideoCompare(photoPath, "D:\\zjphoto\\face.jpg");
    if(valRet > 0){//成功比对出分值
      if(valRet < cfg.similar){
        // $('.li-thi p').html('人脸匹配低于' + cfg.similar*100 + '%' + ' 请重新验证');
        hint();	
      }else{
        // $('.li-thi .s-msg').show().html('相似对比度为：'+valRet.toFixed(2)*100+'%');
        // $('.li-thi .idPhoto').show();
        // $('#memberHandleReader,.li-thi .gif').hide();
        // $('.li-thi p').html('人脸匹配成功');
        const len = cfg.peopleData.length;
        cfg.peopleData.map((val,key) => {
          if (len == (key + 1)) {
            val.faceImg = embedObj.GetBase64Img("D:\\zjphoto\\face.jpg"); //人脸图像64编码
            val.faceSimilar =  valRet.toFixed(2);//人脸识别相似度
          }
        })
        //将图片转成base64编码显示到页面
        document.all['cameraPhoto'].src = 'data:image/bmp;base64,' + embedObj.GetBase64Img("D:\\zjphoto\\face.jpg");
        embedObj.FaceCloseVideo();//关闭摄像头
        FaceVideo = 1;
        embedObj.FaceRelease();//释放人脸库初始化    可在页面退出时调用
        // setTimeout('peopleHanlde_vm.nextStep()',1000);
        return flag = true;
      }   
    }else if(valRet==-2){
      // $('.li-thi p').html('未检测到人脸！');
      hint();	
    }else if(valRet==-3 || valRet==-4){
      // $('.li-thi p').html('人脸位置不合格！');
        hint()
    }else if(valRet==-5){
      // $('.li-thi p').html('人脸特征值提取失败！');
        hint()
    }else if(valRet==-6){
      // $('.li-thi p').html('照片中人脸检测失败！');
        hint()
    };
};

/*识别身份证*/
const handleCard = () => {
  let flag = false;
  const embedObj = document.getElementById("RoutonReader");
  const isInit = false;
  let rst = null; //读卡识别标志
  if (cfg.IsValid) {
    //读取身份证
    embedObj.setPortNum(0);
    if (false == isInit) {
      //设置端口号，1表示串口1，2表示串口2，依此类推；1001表示USB。0表示自动选择
      const port = embedObj.setPortNum(0); //changed args
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
  } else {
    //假设身份证读取成功
    rst = 0x90;
  }
  //获取信息
  if (rst == 0x90) {
    getPeopleMsg();
  } else {
    handleCard();
  }
  return flag = true;
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
  FaceVideoComp: FaceVideoComp,//人脸
};

export default common;
