import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
Vue.use(Vuex)

const state = {
	isLogin: 0,
	userInfo: null,
	storeInfo: null,
}
const mutations = {
	CHANGE_LOGIN (state, isLogin) {
		state.isLogin = isLogin
	},
	SAVE_USERINFO (state, userInfo) {
		state.userInfo = userInfo
	},
	SAVE_STOREINFO (state, storeInfo) {
		state.storeInfo = storeInfo
	},
}
export default new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})