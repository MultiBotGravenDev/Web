import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'
import Cookies from 'js-cookie'
import users from './modules/users';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    saveState: (key, state) => Cookies.set(key, state, {
        expires: new Date(Date.now() + 3600000)
    })
});

const store = new Vuex.Store({
    modules: {
        users,
    },
    plugins: [vuexLocal.plugin]
})

export default store;
