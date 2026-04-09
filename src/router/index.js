import { createRouter, createWebHistory } from 'vue-router';
import HistoryPage from '@/pages/HistoryPage.vue';

const routes = [
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
