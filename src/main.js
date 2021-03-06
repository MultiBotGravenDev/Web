import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/router';
import axios from 'axios';
import store from './store/index'
import {sync} from 'vuex-router-sync'

sync(store, router);

Vue.prototype.$axios = axios.default;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
}).$mount('#app');
