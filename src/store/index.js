import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {}
	},
	getters: {
		getUser: state => state.user,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		changeUserPhone(state, {value, name}) {
			if(!state.user.contacts[name]) {
				Vue.set(state.user.contacts, name, {});
			}
			Vue.set(state.user.contacts[name], 'text', value);
		},
		changeUserAbout(state, value) {
			Vue.set(state.user, 'about', value);
		},
		changeUserSkills(state, {labels, type}) {
			Vue.set(state.user, type, []);
			labels.forEach((el, i) => {
				Vue.set(state.user[type], i, el)
			})
		},
		changeUserSocials(state, socials) {
			socials.forEach((el, i) => {
				if (state.user.socials[i].type === el.type) {
					Vue.set(state.user.socials[i], 'url', el.url);
				}
			})
		},
		changeUserAvatar(state, img) {
			Vue.set(state.user, 'photo', img)
		}
	},
	actions: {
		GET_USER({commit}) {
			axios
				.get('/data/user.json')
				.then((res) => {
					commit("setUser", res.data);
				});
		},
		/*Тут отправляем данные на сервер*/
		CHANGE_USER_PHONE({commit}, payload) {
			commit('changeUserPhone', {value: payload.value, name: payload.name});
		},
		CHANGE_USER_ABOUT({commit}, payload) {
			commit('changeUserAbout', payload.value);
		},
		CHANGE_USER_SKILLS({commit}, payload) {
			commit('changeUserSkills', {labels: payload.labels, type: payload.type});
		},
		CHANGE_USER_SOCIALS({commit}, payload) {
			commit('changeUserSocials', payload.socials);
		},
		CHANGE_USER_AVATAR({commit}, payload) {
			commit('changeUserAvatar', payload.img);
		}
	},
	strict: process.env.NODE_ENV !== "production"
})
