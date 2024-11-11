import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif


// #ifdef VUE3
import { createSSRApp } from 'vue'

//导入组件
import topbar from "./components/topbar/topbar.vue"
import searchbar from "./components/searchbar/searchbar.vue"

//导入js
import * as util from "./scripts/util.js"

export function createApp() {
  const app = createSSRApp(App)
  
  //注册组件
  app.component('topbar',topbar)
  app.component('searchbar',searchbar)
  
  //注册变量
  app.config.globalProperties.$url = util.url
  app.config.globalProperties.$ws = util.ws
  
  //注册函数
  app.config.globalProperties.$formatTime = util.formatTime
  app.config.globalProperties.$maskString = util.maskString
  app.config.globalProperties.$getImageUrl = util.getImageUrl
  
  return {
    app
  }
}
// #endif