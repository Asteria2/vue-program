export default [
  {
    path: '/goods',
    component: () => import('../pages/ele-goods/ele-goods.vue')
  },
  {
    path: '/ratings',
    component: () => import('../pages/ele-ratings.vue')
  },
  {
    path: '/sellers',
    component: () => import('../pages/ele-seller.vue')
  },
  {
    path: '/',
    redirect: '/goods'
  },
]
