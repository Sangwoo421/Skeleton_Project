<template>
  <header
    class="d-flex align-items-center px-4 bg-white border-bottom"
    style="height: 64px"
  >
    <span class="fw-bold fs-5 text-dark">{{ pageTitle }}</span>

    <div class="d-flex align-items-center justify-content-evenly flex-grow-1">
      <div class="d-flex flex-column align-items-center">
        <span class="text-secondary" style="font-size: 12px">이번 달 수입</span>
        <span class="fw-bold text-success ms-5"
          >{{ formatAmount(totalIncome) }}원</span
        >
      </div>

      <div class="d-flex flex-column align-items-center">
        <span class="text-secondary" style="font-size: 12px">이번 달 지출</span>
        <span class="fw-bold text-danger ms-5"
          >{{ formatAmount(totalExpense) }}원</span
        >
      </div>

      <div class="d-flex flex-column align-items-center">
        <span class="text-secondary" style="font-size: 12px">이번 달 수익</span>
        <span
          class="fw-bold ms-5"
          :class="netProfit >= 0 ? 'text-success' : 'text-danger'"
        >
          {{ netProfit >= 0 ? '+' : '-' }}{{ formatAmount(netProfit) }}원
        </span>
      </div>
    </div>
    <button
      class="btn rounded-circle fw-bold"
      style="
        width: 36px;
        height: 36px;
        font-size: 20px;
        line-height: 1;
        padding: 0;
        background-color: orange;
      "
      @click="$router.push({ name: 'register' })"
    >
      +
    </button>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const transactions = ref([]);

const pageTitle = computed(() => {
  const titleMap = {
    home: '대시보드',
    transactions: '거래 내역',
    register: '거래 등록',
    profile: '개인정보',
  };
  return titleMap[route.name] ?? '대시보드';
});

const currentMonthTransactions = computed(() => {
  const now = new Date();
  return transactions.value.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  });
});

const totalIncome = computed(() =>
  currentMonthTransactions.value
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0),
);

const totalExpense = computed(() =>
  currentMonthTransactions.value
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0),
);

const netProfit = computed(() => totalIncome.value - totalExpense.value);

function formatAmount(amount) {
  return Math.abs(amount).toLocaleString('ko-KR');
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/transactions');
    transactions.value = data;
  } catch (e) {
    console.error(
      'json-server에 연결할 수 없습니다. 서버를 실행해주세요:',
      e.message,
    );
  }
});
</script>
