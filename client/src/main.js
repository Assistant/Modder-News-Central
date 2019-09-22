import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

import './styles/animate.css'
import './styles/styles.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'https://mnc.auros.dev/api'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
