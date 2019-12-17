import Vue from 'vue'
import App from './App.vue'
import './mock'
import router from './router'
import './common/stylus/reset.styl'
import './common/stylus/style.styl'
import './common/stylus/transition.styl'
import http from '@/api'


Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
