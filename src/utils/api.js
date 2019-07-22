import axios from "axios";
import qs from "qs";

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancel = "";
let requestConfig = {
  production: "http://www.tutrav.cn",
  development: "http://test.tutrav.cn",
  timeout: 1000
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

axios.defaults.baseURL = requestConfig[process.env.NODE_ENV];
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次请求之前拦截加上token
    console.log(config);
    const token = sessionStorage.token;
    token && (config.headers["X-CSRF-TOKEN"] = token);

    removePending(config); //在一个ajax发送前执行一下取消操作
    pending.push({ config: config, cancel: cancel });
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    removePending(response.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    // 对响应数据做点什么
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    // 对响应错误做点什么
    // 这里可以指定判断错误码来提示或者重定向
    console.log("error", error);

    // eslint-disable-next-line no-empty
    if (error) {
      // store.commit(types.LOGOUT);
      router.replace({
        path: "login"
        // query: { redirect: router.currentRoute.fullPath } // URL 查询参数
      });
    }
    return Promise.reject(error);
  }
);

const handelData = (options, data) => {
  let httpDefaultOpts = {
    timeout: requestConfig.timeout,
    method: options.method,
    url: options.url,
    responseType: "json",
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
    arrayFormat: options.arrayFormat, //有三个参数 'indices' id[0]=b&id[1]=c  'brackets' 'id[]=b&id[]=c' 'repeat' 'id=b&id=c'
    data,
    header: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    cancelToken: new axios.CancelToken(c => {
      cancel = c; // 记录当前请求的取消方法
    })
  };
  httpDefaultOpts.data = httpDefaultOpts.method === "post" ? qs.stringify(httpDefaultOpts.data) : "";
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
export default handelData;
