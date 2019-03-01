import axios from "axios";

// 创建实例时设置配置的默认值
const BASEURL = process.env.VUE_APP_BASEURL;
const instance = axios.create({
  baseURL: BASEURL
});

export default instance;
