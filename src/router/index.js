import { createRouter, createWebHistory } from 'vue-router';
import Transactions from '@/pages/Transactions.vue';
import HistoryPage from '@/pages/HistoryPage.vue';
import Setting from '@/pages/setting.vue';

const routes = [
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
  },
  {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
