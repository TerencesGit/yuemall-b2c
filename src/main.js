// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import moment from 'moment'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'element-ui/lib/theme-default/index.css'
// import 'font-awesome/css/font-awesome.min.css'
import '@/assets/css/main.scss'
import FullCalendar from '@/components/fullcalendar'
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(FullCalendar)
Vue.prototype.$nprogress = NProgress;
Vue.prototype.$moment = moment;
NProgress.configure({ ease: 'ease', speed: 500, minimum: 0.5, showSpinner: false})
Vue.config.productionTip = false
Vue.directive('title', {
  inserted (el, binding) {
    document.title = el.dataset.title
  }
})
const router = new Router({
	routes
})
router.beforeEach((to, from, next) => {
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
