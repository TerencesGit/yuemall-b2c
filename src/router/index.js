import Layout from '@/components/Layout'
import Home from '@/pages/home'
const routes = [
	{
		path: '/',
    name: 'index',
    redirect: '/home'
	},
	{
    path: '/',
    name: 'Hello',
    component: Layout,
    children: [
    	{ path: 'home', name: 'home', component: Home }
    ]
  },

]
export default routes
