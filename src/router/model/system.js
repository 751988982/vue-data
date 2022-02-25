import Layout from '@/layout'

const activeRouter = {
  path: '/system',
  component: Layout,
  // hidden: true,
  meta: {
    title: '系统管理',
    icon: 'excel',
    roles: ['/user', '/study', '/about', '/pay']
  },
  children: [
    {
      path: '/user',
      component: () => import('@/views/system/user'),
      name: 'user',
      meta: { title: '管理员管理', roles: ['/user'] }
    },
    {
      path: '/player',
      component: () => import('@/views/system/player'),
      name: 'player',
      meta: { title: '用户管理', roles: ['/player'] }
    },
    {
      path: '/about',
      component: () => import('@/views/system/about'),
      name: 'about',
      meta: { title: '关于我们', roles: ['/about'] }
    },
    {
      path: '/pay',
      component: () => import('@/views/system/pay'),
      name: 'pay',
      meta: { title: '支付管理', roles: ['/pay'] }
    }
  ]
}
export default activeRouter
