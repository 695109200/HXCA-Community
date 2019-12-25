import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		HeadImg: "",
		Name: '',
		Sign: '',
		sex: ''
	},
	mutations: {
		setHeadImg(state, url) {
			state.HeadImg = url
		},
		setName(state, Name) {
			state.Name = Name
		},
		setSign(state, Sign) {
			state.Sign = Sign
		},
		setsex(state, sex) {
			state.sex = sex
		},
		sethomelist(state,list){
			state.hometlist = list
		}
	},
	actions: {

	}
})
