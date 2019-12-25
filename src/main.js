import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'font-awesome/css/font-awesome.css'

Vue.use(VueCookies)
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.prototype.$axios = axios
Vue.use(ElementUI);
new Vue({
  ElementUI,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
