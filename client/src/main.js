import Vue from 'vue'
import App from './App.vue'
import {
    createRouter
} from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

let router = createRouter()
Vue.use(Buefy)
new Vue({
    router,
    render: h => h(App)
}).$mount("#app")