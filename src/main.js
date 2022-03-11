import Vue from 'vue'
import App from './App.vue'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { LayoutPlugin, NavbarPlugin, IconsPlugin, ButtonPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(LayoutPlugin)
Vue.use(NavbarPlugin)
Vue.use(ButtonPlugin)
Vue.use(IconsPlugin)

Vue.config.productionTip = false
new Vue({
  render: (h) => h(App),
}).$mount('#app')
