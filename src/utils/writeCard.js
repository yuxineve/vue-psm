import cfg from "@/config/index.js";

/*制卡
*writeParams:写卡请求的参数,酒店ID，详单ID，订单号，房间号，入离时间，早餐券
*/
const WriteCard = (writeParams) => {
	var WriteCardStatus = false;
	var CallBack; //写卡回调变量
	$.ajax({
		url: szblMCom.urlJY + '/outCall/doorlock/writeCard',
		type: 'POST',
		catch: false,
		async: false,
		data: writeParams,
		success: function(ResponseWCard) {
			if(ResponseWCard.code == 0) { //返回的code不等0写卡失败
				WriteCardStatus = true;
			} else {
				Eject();
			}
		},
		error: function(e) { //接口异常返回的
			Eject();
		}
	});
	return WriteCardStatus;
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