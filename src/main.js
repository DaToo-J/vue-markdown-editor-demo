import Vue from 'vue'
import App from './App.vue'
import 'view-design/dist/styles/iview.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import { Split, Modal, Message, Button, Tooltip, Icon } from 'view-design';

Vue.config.productionTip = false

Vue.component('Split', Split);
Vue.component('Button', Button);
Vue.component('Tooltip', Tooltip)
Vue.component('Icon', Icon)
Vue.prototype.$Modal = Modal;
Vue.prototype.$Message = Message;


new Vue({
  render: h => h(App),
}).$mount('#app')
