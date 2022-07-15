// 引入axios
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
// 创建一个axios实例
// 通过axios创建出来的实例跟axios一模一样
// 但是集成了一些配置项  自动拼接接口地址：api
const request = axios.create({
  baseURL: 'http://42.192.129.12:8000/',
  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data)
      } catch (e) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data
      }
    }
  ]
})

// 设置请求拦截器
// 发送请求前  config： 配置项
request.interceptors.request.use(
  (config) => {
    //  引入token
    const token = store.state?.user?.token
    // 判断token是否存在
    // 存在 ==> 添加请求头
    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 再去响应拦截器 发送给服务端
request.interceptors.response.use()

export default request
