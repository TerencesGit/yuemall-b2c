// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'
import App from './App'
import routes from './router'
import Mock from './mock'
import moment from 'moment'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/main.scss'
import PriceCalendar from '@/components/pricecalendar'
// import Utils from '@/assets/js/utils'
// import LazyLoad from '@/components/lazyLoad'
// Vue.use(Vuex)
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(PriceCalendar)
// Vue.use(LazyLoad)
Vue.prototype.$nprogress = NProgress;
Vue.prototype.$moment = moment;
// Mock.bootstrap()
NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
Vue.config.productionTip = false
Vue.directive('title', {
  inserted (el, binding) {
    document.title = el.dataset.title
  }
})
Vue.prototype.$catchError = (err) => {
  if(!err.data) {
    ElementUI.Message('服务器响应错误')
    return;
  }
  if(err.data.code) {
    ElementUI.Message(err.data.message)
  } else {
    ElementUI.Message('服务器响应超时')
  }
}
const router = new Router({
	routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
  window.scrollTo(0,0)
})
axios.interceptors.request.use(config => {
  return config;
}, error => { 
  return Promise.reject(error)
})
axios.interceptors.response.use(res => {
  // if (res.data.code === '0000') {
  //   router.replace('/login')
  // } 
  return res; 
}, err => {
  return Promise.reject(err)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
