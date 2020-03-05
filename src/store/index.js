import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {
            about: null,
            avatar: null,
            phone_home: null,
            interests: [],
            skills: [],
            socials: []
        }
    },
    getters: {
        getUser: state => state.user,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        SET_USER_PHONE(state, value) {
            state.user.phone_home = value;
        },
        SET_USER_ABOUT(state, value) {
            state.user.about = value;
        },
        SET_USER_SKILLS(state, {labels, type}) {
            labels.forEach(label => {
                state.user[type].push(label)
            });
        },
        SET_USER_SOCIALS(state, socials) {
            if (state.user.socials.length) {
                socials.forEach((social, index) => {
                    let item = state.user.socials[index];
                    if (item.type === social.type) {
                        item.url = social.url;
                    }
                });
            } else {
                socials.forEach(social => {
                    state.user.socials.push(social)
                });
            }

        },
        SET_USER_AVATAR(state, img) {
			console.log(img)
            state.user.avatar = img;
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
        changeUserPhone({commit}, payload) {
            commit('SET_USER_PHONE', payload.value);
        },
        changeUserAbout({commit}, payload) {
            commit('SET_USER_ABOUT', payload.value);
        },
        changeUserSkills({commit}, payload) {
            commit('SET_USER_SKILLS', {labels: payload.labels, type: payload.type});
        },
        changeUserSocials({commit}, payload) {
            commit('SET_USER_SOCIALS', payload.socials);
        },
        changeUserAvatar({commit}, payload) {
            commit('SET_USER_AVATAR', payload.img);
        }
    },
    strict: process.env.NODE_ENV !== "production"
})
