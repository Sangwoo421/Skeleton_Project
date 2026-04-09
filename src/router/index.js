import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Register from '@/pages/Register.vue';
import Transactions from '@/pages/Transactions.vue';
import HistoryPage from '@/pages/HistoryPage.vue';
import Setting from '@/pages/setting.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/home', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
  { path: '/transactions', name: 'transactions', component: Transactions },
  {
    path: '/transactions/edit/:id',
    name: 'edit-transaction',
    component: Transactions,
    props: true,
  },
  { path: '/history', name: 'history', component: HistoryPage },
  { path: '/setting', name: 'setting', component: Setting },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
