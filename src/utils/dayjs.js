import dayjs from 'dayjs'
// 默认是英文
// 注册中文语言包
import 'dayjs/locale/zh-cn'
// 引入相对时间包
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 当前时间 to 目标时间
// console.log(dayjs().to(dayjs('2001-06-06')))
// console.log(dayjs().format('YYYY-MM-DD'))

// 过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(new Date(value)))
})
