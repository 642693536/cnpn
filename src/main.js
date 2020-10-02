import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//reset.css
import './assets/styles/reset.css'
//iconfont
import './assets/styles/iconfont/iconfont.css'
/*element ui*/
import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


//首先进入登录页面
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('Authorization')
    localStorage.removeItem('UserName');
    next()
  } else {
      let AuthorizationData = JSON.parse(window.localStorage.getItem('Authorization'))
    if (!AuthorizationData) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
