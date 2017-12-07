import Container from '@/components/Container'
import Login from '@/pages/login'
import Index from '@/pages/index'
import List from '@/pages/list'
import Native from '@/pages/native'
import Oversea from '@/pages/oversea'
import Detail from '@/pages/detail'
import Order from '@/pages/order'
import Payment from '@/pages/payment'
import Completed from '@/pages/completed'
import OrderList from '@/pages/orderList'
const routes = [
	{
    	path: '/',
        name: 'index',
        redirect: '/index'
	},
    {
        path: '/login',
        name: '欢迎登录',
        component: Login
    },
	{
        path: '/',
        name: 'Hello',
        component: Container,
        children: [
        	{ path: 'index', name: 'home', component: Index },
        	{ path: 'list', name: 'list', component: List },
        	{ path: 'native', name: 'native', component: Native },
        	{ path: 'oversea', name: 'oversea', component: Oversea },
        	{ path: 'travel', name: 'travel', component: List },
        	{ path: 'detail', name: 'detail', component: Detail },
            { path: 'order', name: 'book', component: Order },
            { path: 'payment', name: 'payment', component: Payment },
            { path: 'completed', name: 'completed', component: Completed },
        	{ path: 'orderList', name: 'orderList', component: OrderList },
        ]
  },
]
export default routes
