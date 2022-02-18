import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },  
  {
    path: '/',
    component: Layout,
    redirect: '/homepage',
    children: [
      {
        path: 'homepage',
        component: () => import('@/views/homepage'),
        name: 'homepage',
        meta: { title: 'homepage', icon: 'dashboard', affix: true }
      }
    ]
  }
]

export const asyncRoutes = [  
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
