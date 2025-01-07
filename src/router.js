export const routes = [
  {
    path: '/',
    name: "bsc",
    component: () => import(/* webpackChunkName: "home" */ '@/views/bsc.vue')
  }
]
