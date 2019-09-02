
import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";


let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancel = "";
let requestConfig = {
  production: "http://pms.tutrav.cn",
  development: "http://192.168.0.176:9000",//"http://pms.tutrav.cn",
  timeout: 3000
};
let localUrl = {
  production: "http://pms.tutrav.cn",
  development: "http://pms.tutrav.cn",
  timeout: 3000
};

let removePending = ever => {
  for (let i in pending) {
    const urlEve = pending[i].config.url + "&" + pending[i].config.method;
    if (urlEve === ever.url + "&" + ever.method) {
      //当前请求在数组中存在时执行函数体
      pending[i].cancel();
      pending.splice(i, 1);
    }
  }
};
// axios.defaults.baseURL = requestConfig[process.env.NODE_ENV];
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    // 每次请求之前拦截加上token
    // debugger;
    const token = sessionStorage.token;
    if(token && config.url.indexOf('login') == -1){
      config.headers.Authorization = "Bearer " + token;
    }
    removePending(config); //在一个ajax发送前执行一下取消操作
    pending.push({ config: config, cancel: cancel });
    return config;
  },
  error => {
    Message({
      type: "error",
      message: "网络错误，请稍后重试！",
      center: true
    });
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    // 对响应数据做点什么
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      Message({
        type: "error",
        message: "网络错误，请稍后重试！",
        center: true
      });
      return Promise.reject(response);
    }
  },
  error => {
    // 对响应错误做点什么（这里可以指定判断错误码来提示或者重定向）
    Message({
      type: "error",
      message: "网络错误，请稍后重试！",
      center:true, 
    });
    return Promise.reject(error);
  }
);

const VueAxios = (options, data, params) => {
  let httpDefaultOpts = {
    baseURL: requestConfig[process.env.NODE_ENV],
    timeout: requestConfig.timeout,
    method: options.method,
    url: options.url,
    responseType: "json",
    // withCredentials: true, // 表示跨域请求时是否需要使用凭证
    arrayFormat: options.arrayFormat, //有三个参数 'indices' id[0]=b&id[1]=c  'brackets' 'id[]=b&id[]=c' 'repeat' 'id=b&id=c'
    data,
    params,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    cancelToken: new axios.CancelToken(c => {
      cancel = c; // 记录当前请求的取消方法
    })
  };
  httpDefaultOpts.data =httpDefaultOpts.method === "post"? qs.stringify(httpDefaultOpts.data): "";
  return new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const LocalAxios = (options, data) => {
  let httpDefaultOpts = {
    baseURL: localUrl[process.env.NODE_ENV],
    timeout: localUrl.timeout,
    method: options.method,
    url: options.url,
    responseType: "json",
    arrayFormat: options.arrayFormat,
    data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    cancelToken: new axios.CancelToken(c => {
      cancel = c; // 记录当前请求的取消方法
    })
  };
  httpDefaultOpts.data =
    httpDefaultOpts.method === "post" ? qs.stringify(httpDefaultOpts.data) : "";
  return new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export { VueAxios, LocalAxios };
