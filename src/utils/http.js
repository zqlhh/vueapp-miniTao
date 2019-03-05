import axios from "axios";
import qs from "qs";

// 创建实例时设置配置的默认值
const BASEURL = process.env.VUE_APP_BASEURL;
const instance = axios.create({
  baseURL: BASEURL
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (config.method === "post" && config.ISFORMDATA) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default instance;
