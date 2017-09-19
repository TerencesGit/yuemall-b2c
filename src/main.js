// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'
import App from './App'
import routes from './router'
import Mock from './mock'
import moment from 'moment'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/main.scss'
import Utils from '@/assets/js/utils'
import FullCalendar from '@/components/fullcalendar'
Vue.use(Vuex)
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(FullCalendar)
import LazyLoad from '@/components/lazyLoad'
Vue.use(LazyLoad)
Vue.prototype.$nprogress = NProgress;
Vue.prototype.$moment = moment;
Mock.bootstrap()
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
  Vue.prototype.$fromPath = from.path === '/login' ? '/home' : from.path;
  let user = Utils.getCookie('userId')
  let logRequired = to.path.indexOf('order') !== -1 || 
                    to.path.indexOf('payment') !== -1;
  if(logRequired && !user) {
    ElementUI.Message('尚未登录或当前会话已过期，请重新登录')
    return router.push('/login')
  } 
  NProgress.start()
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
