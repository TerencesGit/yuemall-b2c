import Container from '@/components/Container'

// help page
import PhotoStrategy from '@/views/help/photo_term'
import TourismStrategy from '@/views/help/tourism_term'
import Attentions from '@/views/help/customer_complain'

// view1
import Index from '~/index'
import UserLogin from '~/login/login'
import UserRegister from '~/login/register'

import Show from '~/show/index'
import ShowDetail from '~/show/detail'

import WareList from '~/ware/list'
import WareDetail from '~/ware/detail'
import WareFillOrder from '~/ware/fillOrder'

import OrderFillInfo from '~/ware/fillInfo'
import OrderPay from '~/ware/pay'

import MyCenter from '~/myCenter/myCenter'
import myCenter1 from '~/myCenter/components/myCenter1'
import myCenter2 from '~/myCenter/components/myCenter2'
import myCenter3 from '~/myCenter/components/myCenter3'
import myCenter4 from '~/myCenter/components/myCenter4'
import myCenter5 from '~/myCenter/components/myCenter5'

const routes = [
	{
  	path: '/',
    redirect: '/index'
	},
	{
    path: '/',
    name: 'index',
    component: Container,
    children: [
      { path: 'index', name: '首页', component: Index },
      { path: 'login',name: '欢迎登录',component: UserLogin },
      { path: 'register',name: '欢迎注册',component: UserRegister },
      { path: 'show', name: '客片列表', component: Show },
      { path: 'show/detail', name: '客片展示', component: ShowDetail },
      {
        path: 'myCenter',
        name: '个人中心',
        component: MyCenter,
        children : [
          { path: 'myCenter1', name: '个人中心1', component: myCenter1 },
          { path: 'myCenter2', name: 'myCenter2', component: myCenter2 },
          { path: 'myCenter3', name: 'myCenter3', component: myCenter3 },
          { path: 'myCenter4', name: 'myCenter4', component: myCenter4 },
          { path: 'myCenter5', name: 'myCenter5', component: myCenter5 },
        ]
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