import { createRouter, createWebHistory } from 'vue-router';
import Transactions from '@/pages/Transactions.vue';
import HistoryPage from '@/pages/HistoryPage.vue';

const routes = [
  {
    path: '/',
    name: 'transactions',
    component: Transactions,
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;