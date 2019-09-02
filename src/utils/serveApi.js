const SERVE_API = {
  login: {
    //登陆
    method: "post",
    url: "/api/user/login",
    arrayFormat: ""
  },
  testApi: {
    //测试接口
    method: "post",
    url: "/api/user/getHotelId",
    arrayFormat: ""
  },
  getTotleRTScene: {
    //获取酒店所有房型
    method: "get",
    url: "/localeRes/getRoomType",
    arrayFormat: ""
  },
  getPriceByDayScene: {
    //根据天数获取价格表
    method: "get",
    url: "/localeRes/getPriceByDay",
    arrayFormat: ""
  },
  getThisRTScene: {
    //获取指定房型信息
    method: "get",
    url: "/localeRes/getThisRoomType",
    arrayFormat: ""
  },
  returnPreStepScene: {
    //返回
    method: "post",
    url: "/localeRes/returnPreStep",
    arrayFormat: ""
  },
  uploadCheckinInfo: {
    //保存预定单 ---------------out-call
    method: "post",
    url: "/pubSec/uploadCheckinInfo",
    arrayFormat: ""
  }
};

export default SERVE_API;