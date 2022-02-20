import Layout from '@/layout'

const activeRouter = {
  path: '/notice',
  component: Layout,
  // hidden: true,
  meta: {
    title: '动态管理',
    icon: 'excel',
    roles: ['/notice', '/study']
  },
  children: [
    {
      path: '/notice',
      component: () => import('@/views/notice/notice'),
      name: 'notice',
      meta: { title: '公告管理', roles: ['/notice'] }
    },
    {
      path: '/study',
      component: () => import('@/views/notice/study'),
      name: 'study',
      meta: { title: '研报管理', roles: ['/study'] }
    }
  ]
}
export default activeRouter
