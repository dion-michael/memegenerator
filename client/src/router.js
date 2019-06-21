import Vue from 'vue'
import Router from 'vue-router'
import detail from './views/detail.vue'
import home from './views/home.vue'

Vue.use(Router)

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [{
                path: '/login',
                name: 'login page',
                component: detail,
                props: true
            },
            {
                path: '/',
                name: 'home page',
                component: home
            }
        ]
    })
}