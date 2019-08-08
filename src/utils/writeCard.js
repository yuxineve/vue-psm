import cfg from "@/config/index.js";
/* 
*写卡文件
*eleID:读卡硬件ID
*/
const writeCard = () => {
    var eleID = ducument.getElementById("writeCard");
    initPort(eleID);
    if(cfg.isWriteCard){//是否写卡


    }
}

//初始化串口
const initPort = eleID => {
  closePort(eleID);
  var ret = openPort(eleID);
  if(ret != 0){
      initPort();
  }
  
};
//关闭串口
const closePort = eleID => {
    var ret = eleID.CommClose();
    return ret;
};
//打开串口
const openPort = eleID => {
    var params = cfg.IsSerialPort;
    var ret = eleID.CommOpenWithBaud(params,9600);
    return ret;
};
//移动射频卡位置
const moveRFSite = () => {
    
}

export default writeCard;