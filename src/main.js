import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toasts from './toasts'
// Importaciones axios
import axios from 'axios'
import VueAxios from 'vue-axios'
// Importaciones bootstrap-vue-next
import { createBootstrap, BButton, BModal } from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
// importacion Styles
import './assets/styles/styles.scss'

App = createApp(App);
App.use(toasts);
// Configuración global de bootstrap-vue-next
App.use(createBootstrap({ components: true, directives: true }))
App.component('BButton', BButton);
App.component('BModal', BModal);
// Configuración global de axios
App.use(VueAxios, axios);
// Configuración por defecto
App.use(store).use(router).mount('#app');