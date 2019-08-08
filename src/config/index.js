const cfg = {
  IsValid: false, //是否含有硬件，需要人脸识别
  ISMOCK: true, //是否mock
  similar: 0.9,
  peopleData:[],//硬件读取身份的信息
  initFace:'',//人脸初始化
  IsSerialPort : "COM1",//通信湍口号，酒店环境填COM2,公司环境填COM1
  isWriteCard:true,
};



export default cfg