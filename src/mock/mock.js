import axios from 'axios'
import Utils from '@/assets/js/utils'
import MockAdapter from 'axios-mock-adapter'
import { UserList, MenuList, BannerList, HotImgList, HotSmallImgList,
	NationwideLargeImgList, NationwideImgList, OverseasList,
	SamplesImgList, WareList, RecommendList, WareImgList, } from './data/data'
let _UserList = UserList;
const retObj = {
	code: '0001',
	message: '操作成功',
	result: {}
}
const retExpireObj = {
	code: '0000',
	message: '尚未登录或当前会话已过期',
	result: {}
}
export default {
	bootstrap() {
		let mock = new MockAdapter(axios)
		// 用户登录
		mock.onPost('/login').reply(config => {
			let { username, password, isAdmin } = JSON.parse(config.data);
			let loginUser = _UserList.filter(user => user.email === username && 
				user.isAdmin === isAdmin)[0];
			if(loginUser) {
				if(loginUser.password === password) {
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							retObj.result.userInfo = loginUser;
							resolve([200, retObj])
						}, 1000)
					})
				} else {
					let retObj = {
						code: '1002',
						message: '密码错误'
					}
					return new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve([200, retObj])
						}, 1000)
					})
				}
			} else {
				let retObj = {
					code: '1001',
					message: '用户名不存在'
				}
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retObj])
					}, 1000)
				})
			}
		})
		// 登出
		mock.onGet('/logout').reply(config => {
			Utils.delCookie('userId')
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 获取用户信息
		mock.onGet('/accountInter/getMyInfo.do').reply(config => {
			let userId = Utils.getCookie('userId');
			if(!userId) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retExpireObj])
					}, 500)
				})
			}
			let _userInfo = _UserList.filter(user => user.userId == userId)[0]
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					userInfo: _userInfo
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 获取导航栏
		mock.onGet('/mall/getMenus.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					menuList: MenuList
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
		// 获取Banners
		mock.onGet('/mall/getBanners.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					bannerList: BannerList
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
		// 获取ImgList
		mock.onGet('/mall/getImgList.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					hotImgList: HotImgList,
					hotSmallImgList: HotSmallImgList,
					nationwideImgList: NationwideImgList,
					nationwideLargeImgList: NationwideLargeImgList,
					overseasList: OverseasList,
					samplesImgList: SamplesImgList,
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
		// 获取WareList
		mock.onGet('/mall/getWares.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					wareList: WareList
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
		// 获取RecommendList
		mock.onGet('/mall/getRecommends.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					recommendList: RecommendList
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
		// 获取WareImgList
		mock.onGet('/mall/getWareImgs.do').reply(config => {
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {
					wareImgList: WareImgList
				}
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 0)
			})
		})
	}
}