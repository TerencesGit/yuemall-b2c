import Container from '@/components/Container'
import IndexContainer from '@/components/IndexContainer'
import Login from '@/pages/login'
// import Index from '@/pages/index_old'
// import List from '@/pages/list'
// import Native from '@/pages/native'
// import Oversea from '@/pages/oversea'
// import Detail from '@/pages/detail'
// import Order from '@/pages/order'
// import Payment from '@/pages/payment'
// import Completed from '@/pages/completed'
// import OrderList from '@/pages/orderList'

// help page
import PhotoStrategy from '@/pages/help/photo_term'
import TourismStrategy from '@/pages/help/tourism_term'
import Attentions from '@/pages/help/customer_complain'
// view1
import Index from '~/index'
import Show from '~/show/index'
import ShowDetail from '~/show/detail'
import WareList from '~/ware/list'
import WareDetail from '~/ware/detail'
import WareFillOrder from '~/ware/fillOrder'

import OrderFillInfo from '~/ware/fillInfo'

import OrderPay from '~/ware/pay'
import UserLogin from '~/login/login'
import UserRegister from '~/login/register'

const routes = [
	{
    	path: '/',
      redirect: '/index'
	},
  // {
  //     path: '/login',
  //     name: '欢迎登录',
  //     component: UserLogin
  // },
  // {
  //     path: '/register',
  //     name: '欢迎注册',
  //     component: UserRegister
  // },
	{
    path: '/',
    name: 'index',
    component: Container,
    children: [
      { path: 'index', name: '首页', component: Index },
      { path: 'show', name: '客片列表', component: Show },
      { path: 'show/detail', name: '客片展示', component: ShowDetail },
      // { path: 'list', name: '列表页', component: List },
      // { path: 'native', name: 'native', component: Native },
      // { path: 'oversea', name: 'oversea', component: Oversea },
      // { path: 'travel', name: 'travel', component: List },
      // { path: 'detail', name: 'detail', component: Detail },
      // { path: 'order', name: 'book', component: Order },
      // { path: 'payment', name: 'payment', component: Payment },
      // { path: 'completed', name: 'completed', component: Completed },
      // { path: 'orderList', name: 'orderList', component: OrderList },
    ]
  },
  {
    path: '/',
    name: '登录注册页',
    component: Container,
    children: [
      {
          path: 'login',
          name: '欢迎登录',
          component: UserLogin
      },
      {
          path: 'register',
          name: '欢迎注册',
          component: UserRegister
      },
    ]
  },
  {
      path: '/ware',
      name: '商品页',
      component: Container,
      children: [
        { path: 'list', name: '商品列表页', component: WareList },
        { path: 'detail', name: '商品详情页', component: WareDetail },
        { path: 'reserve', name: '商品预定页', component: WareFillOrder },
        { path: 'pay', name: '订单支付页', component: OrderPay },
        { path: 'fillInfo', name: '订单完善信息页', component: OrderFillInfo },
      ]
  },
  {
    path: '/help',
    name: '帮助页',
    component: Container,
    children: [
      { path: 'photo_strategy', name: '旅拍攻略', component: PhotoStrategy },
      { path: 'tourism_strategy', name: '旅游攻略', component: TourismStrategy },
      { path: 'attentions', name: '注意事项', component: Attentions },
    ]
  },
  {
    path: '*',
    redirect: '/',
  }
]
export default routes
