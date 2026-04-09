import { createRouter, createWebHistory } from 'vue-router';
import Setting from '@/pages/setting.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/setting',
    },
    {
      path: '/setting',
      component: Setting,
    },
  ],
});

export default router;
