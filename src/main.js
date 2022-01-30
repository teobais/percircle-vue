import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import {
  LayoutPlugin,
  NavbarPlugin,
  IconsPlugin,
  ButtonPlugin,
} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(LayoutPlugin)
Vue.use(NavbarPlugin)
Vue.use(ButtonPlugin)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  render: (h) => h(App),
}).$mount('#app')
