import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login/LoginIndex.vue')
  },
  {
    path: '/demo',
    component: () => import('@/views/demo.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'wenda',
        component: () => import('@/views/Wenda')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'myself',
        component: () => import('@/views/Myself')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/art/:articleId',
    component: () => import('@/views/Article'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
