import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './element/index'
import './element/theme/theme/index.css'
import './assets/css/common.css'
import './assets/css/style.css'
import './assets/font/iconfont.css'
import './assets/font/iconfont.js'
import * as echarts from 'echarts'

// IOT相关
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/iot_style.css'
import Vuex from 'vuex'

import axios from 'axios'

import 'amfe-flexible'

Vue.use(element);
Vue.use(iView);
Vue.use(Vuex);


Vue.prototype.axios = axios
Vue.prototype.echarts=echarts

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
