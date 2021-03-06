import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
// 引入vant组件库
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.less'
// 引入amfe-flexible插件 用于设置 rem 基准值
import 'amfe-flexible'
// 引入dayjs
import '@/utils/dayjs'
// 引入组件
import TouTiao from '@/components/TouTiao.vue'
// 测试一下接口是否可用
import request from '@/utils/request'
request.get('/v1_0/channels').then((res) => {
  console.log(res.data.data.channels)
})
// 注册vant组件
Vue.use(Vant)
// 注册全局组件
Vue.component('TouTiao', TouTiao)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
