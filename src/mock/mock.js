import axios from 'axios'
import Utils from '@/assets/js/utils'
import MockAdapter from 'axios-mock-adapter'
import { UserList, PartnerList, OrganizeList, FunctionTree } from './data/user'
let _UserList = UserList,
		_PartnerList = PartnerList,
		_Organizes = OrganizeList,
		_FunctionTree = FunctionTree;
const retObj = {
	code: '0001',
	message: '操作成功',
	result: {}
}
const retExpireObj = {
	code: '0002',
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
		mock.onGet('/accountInter/getMyinfo.do').reply(config => {
			let userId = Utils.getCookie('userId')
			if(!userId) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retExpireObj])
					}, 500)
				})
			}
			userId = atob(unescape(userId))
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
		// 更新用户信息
		mock.onPost('/accountInter/updateMyInfo.do').reply(config => {
			let userId = sessionStorage.getItem('userId');
			if(!userId) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retExpireObj])
					}, 500)
				})
			}
			let { name, realname, sexual, qq, birthday, areaName, idcardNum, 
				idcardPicFront, idcardPicBack } = JSON.parse(config.data);
			_UserList.filter(user => {
				if(user.userId == userId) {
					user.name = name;
					user.realname = realname;
					user.sexual = sexual;
					user.qq = qq;
					user.birthday = birthday;
					user.areaName = areaName;
					user.idcardNum = idcardNum;
					user.idcardPicFront = idcardPicFront;
					user.idcardPicBack = idcardPicBack;
				}
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 更新密码
		mock.onPost('/accountInter/updatePwd.do').reply(config => {
			let userId = sessionStorage.getItem('userId');
			console.log(config.data)
			let { oldPassword, newPassword } = JSON.parse(config.data);
			let retObj = {
				code: '0001',
				message: '操作成功',
				result: {}
			}
			_UserList.filter(user => {
				if(user.userId == userId && user.password == oldPassword) {
					user.password = newPassword
				} else {
					retObj = {
						code: '1003',
						message: '原密码错误',
						result: {}
					}
				}
			})
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 新建商家信息
		mock.onPost('/accountInter/createPartner.do').reply(config => {
			let partnerInfo = JSON.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
						resolve([200, retObj])
				}, 500)
			})
		})
		// 获取企业信息
		mock.onGet('/accountInter/getMyPartner.do').reply(config => {
			let userId = sessionStorage.getItem('userId');
			if(!userId) {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve([200, retExpireObj])
					}, 500)
				})
			}
			let _userInfo = _UserList.filter(user => user.userId == userId)[0];
			let _partnerId = _userInfo.partnerId;
			let _partnerInfo = _PartnerList.filter(p => p.partnerId == _partnerId)[0]
			retObj.result = {
				partnerInfo: _partnerInfo
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				})
			})
		})
		// 组织部门树
		mock.onGet('/partner/readOrganizeTree').reply(config => {
			retObj.result = {
				organizeTree: _Organizes
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
						resolve([200, retObj])
				}, 500)
			})
		})
		// 用户列表
		mock.onGet('/user/list').reply(config => {
			let { orgId, name } = config.params;
			let currOrg = OrganizeList.filter(org => org.orgId == orgId)[0];
			if(currOrg.parentId == 0) {
				retObj.result = {
					staffList: _UserList
				}
				return new Promise((resolve, reject) => {
					setTimeout(() => {
							resolve([200, retObj])
					}, 500)
				})
			}
			let orgList = OrganizeList.filter(org => org.orgId == orgId || org.parentId == orgId)
			let _staffList = [];
			orgList.forEach(org => {
				let _adminList = _UserList.filter(user => user.orgId == org.orgId);
				// console.log(_adminList.length)
				_staffList = _adminList.length >= 1 ? _staffList.concat(_adminList) : _staffList
			})
			// _UserList.forEach(user => {
			// 	user.organize = name
			// })
			// _UserList.sort(() => {
  	  // 		return 0.5 - Math.random()
  	  // })
			retObj.result = {
				staffList: _staffList
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
						resolve([200, retObj])
				}, 500)
			})
		})
		// 新增/编辑组织树
		mock.onPost('/partner/saveOrganizeTree').reply(config => {
			let { orgId, name, note, parentId } = JSON.parse(config.data)
			// console.log(orgId, name, note, parentId)
			if(orgId) {
				_Organizes.some(org => {
					if(org.orgId === orgId) {
						org.name = name;
						org.note = note
					}
				})
			} else {
				_Organizes.push({
					orgId: new Date().getTime(),
					name,
					note,
					parentId
				})
			}
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 删除部门
		mock.onPost('/partner/deleteOrganize').reply(config => {
			let { orgId } = JSON.parse(config.data)
			_Organizes = _Organizes.filter(org => org.orgId !== orgId)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 设置部门状态
		mock.onPost('/partner/setOrganizeStatus').reply(config => {
			let { orgId, status } = JSON.parse(config.data)
			_Organizes.filter(org => {
				if(org.orgId === orgId) {
					org.status = org.status === 1 ? 0 : 1
				}
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 重置员工部门
		mock.onPost('/partner/setUserOrg').reply(config => {
			let { userId } = JSON.parse(config.data)
			console.log(userId)
			_UserList.filter(user => {
				console.log(user.userId)
				if(user.userId == userId) {
					user.orgId = '',
					user.orgName = ''
				}
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 删除用户
		mock.onPost('/partner/removeUser').reply(config => {
			let { userId } = JSON.parse(config.data)
			_UserList = _UserList.filter(user => user.userId !== userId)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 获取功能树
		mock.onGet('/adminInter/getFunctionTree.do').reply(config => {
			retObj.result = {
				functionTree: _FunctionTree
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 创建功能点
		mock.onPost('/adminInter/createFunction.do').reply(config => {
			let { parentId, name, funcDesc } = JSON.parse(config.data);
			_FunctionTree.push({
				funcId: new Date().getTime(),
				name,
				funcDesc,
				status: 1,
				parentId,
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 更新功能点
		mock.onPost('/adminInter/updateFunction.do').reply(config => {
			let { funcId, name, funcDesc } = JSON.parse(config.data);
			_FunctionTree.filter(func => {
				if(func.funcId === funcId) {
					func.name = name;
					func.funcDesc = funcDesc
				}
			})
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
		// 删除功能点
		mock.onPost('/adminInter/delFunction.do').reply(config => {
			let { funcId } = JSON.parse(config.data)
			_FunctionTree = _FunctionTree.filter(func => func.funcId !== funcId)
			retObj.result = {}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, retObj])
				}, 500)
			})
		})
	}
}