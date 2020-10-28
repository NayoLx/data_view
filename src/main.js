// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import {storePlugin} from './utils/localStorage.js'
import echarts from 'echarts'

import dataV from '@jiaminghi/data-view'

Vue.use(dataV);
Vue.use(storePlugin);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, echarts },
  template: '<App/>'
})
