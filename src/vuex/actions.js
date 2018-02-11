export const changeLogin = ({ commit }, status) => {
	commit('CHANGE_LOGIN', status)
}
export const saveUserInfo = ({ commit }, userInfo) => {
	commit('SAVE_USERINFO', userInfo)
}
export const saveStoreInfo = ({ commit }, storeInfo) => {
	commit('SAVE_STOREINFO', storeInfo)
}