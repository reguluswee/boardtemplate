export const routes = [
  {
    path: '/',
    name: "bsc",
    component: () => import('@/views/bsc.vue'),
  },
  {
    path: '/token',
    name: "bscToken",
    component: () => import('@/views/PairPage.vue'),
  },
  {
    path: '/CreateToken',
    name: "CreateTokenForm",
    component: () => import('@/views/CreateTokenForm.vue'),
  },
];
