import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    saveState: (key, state) => Cookies.set(key, state, {
        expires: new Date(Date.now() + 3600000)
    })
});

export default new Vuex.Store({
    state: {
        user: {},
        admin: false,
    },
    mutations: {
        SET_USER: (state, newValue) => {
            state.user = newValue;
        },
        SET_ADMIN: (state, newValue) => {
            state.admin = newValue;
        },
    },
    actions: {
        setUser: ({commit, state}, newValue) => {
            commit('SET_USER', newValue);
            return state.user;
        },
        setAdmin: ({commit, state}, newValue) => {
            commit('SET_ADMIN', newValue);
            return state.admin;
        },
    },
    plugins: [vuexLocal.plugin]
})
