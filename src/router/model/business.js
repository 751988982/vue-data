import Layout from '@/layout'

const activeRouter = {
  path: '/business',
  component: Layout,
  // hidden: true,
  meta: {
    title: '业务管理',
    icon: 'excel',
    roles: ['/game', '/game_type', '/bill', '/vip']
  },
  children: [
    {
      path: '/game',
      component: () => import('@/views/business/game'),
      name: 'game',
      meta: { title: '模块管理', roles: ['/game'] }
    },
    {
      path: '/game_type',
      component: () => import('@/views/business/game_type'),
      name: 'game_type',
      meta: { title: '分类管理', roles: ['/game_type'] }
    },
    {
      path: '/bill',
      component: () => import('@/views/business/bill'),
      name: 'bill',
      meta: { title: '商品管理', roles: ['/bill'] }
    },
    {
      path: '/vip',
      component: () => import('@/views/business/vip'),
      name: 'vip',
      meta: { title: 'vip管理', roles: ['/vip'] }
    }
  ]
}
export default activeRouter
