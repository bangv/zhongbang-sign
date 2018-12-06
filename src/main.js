import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import '@coreui/icons/css/coreui-icons.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/scss/font-awesome.scss'
import 'simple-line-icons/scss/simple-line-icons.scss'
import 'flag-icon-css/css/flag-icon.min.css'
import '@coreui/coreui/scss/coreui.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './global.css'
import axios from 'axios'
import './utils/HttpRequest/request'

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
