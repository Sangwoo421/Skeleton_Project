<template>
  <div class="container pt-3 pb-5">
    <HistoryFilter
      :filters="filters"
      :categories="categories"
      :totalIncome="totalIncome"
      :totalExpense="totalExpense"
      @update:filters="(val) => (filters = val)"
    />
    <HistoryTable
      :transactions="paginatedTransactions"
      :categories="categories"
      :formatDate="formatDate"
      :formatAmount="formatAmount"
      :getCategory="getCategory"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="(val) => (currentPage = val)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Pagination from '@/components/history/Pagination.vue';
import HistoryTable from '@/components/history/HistoryTable.vue';
import HistoryFilter from '@/components/history/HistoryFilter.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const router = useRouter();

/**
 * 상태
 */
const transactions = ref([]);

// 필터 상태
const filters = ref({
  startDate: route.query.startDate || '',
  endDate: route.query.startDate || '',
  categoryId: '',
  keyword: '',
  type: '',
});

const categories = ref([]);

const currentPage = ref(1);
const itemsPerPage = 10;

const goPrev = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goNext = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

/**
 * 데이터 가져오기
 */
onMounted(async () => {
  try {
    const tRes = await axios.get('http://localhost:3000/transactions');
    const cRes = await axios.get('http://localhost:3000/categories');

    transactions.value = tRes.data;
    categories.value = cRes.data;
  } catch (err) {
    console.error(err);
  }
});

import { computed } from 'vue';

const filteredTransactions = computed(() => {
  return transactions.value
    .filter((t) => {
      return (
        (!filters.value.startDate || t.date >= filters.value.startDate) &&
        (!filters.value.endDate || t.date <= filters.value.endDate) &&
        (!filters.value.categoryId ||
          t.categoryId === filters.value.categoryId) &&
        (!filters.value.keyword ||
          (t.memo &&
            t.memo
              .toLowerCase()
              .includes(filters.value.keyword.toLowerCase()))) &&
        (!filters.value.type || t.type === filters.value.type)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const totalIncome = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
});

const totalExpense = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.max(
    1,
    Math.ceil(filteredTransactions.value.length / itemsPerPage),
  );
});

/**
 * 카테고리 찾기
 */
const getCategory = (categoryId) => {
  return categories.value.find((c) => c.id === categoryId);
};

/**
 * 날짜 포맷
 */
const formatDate = (date) => date;

/**
 * 금액 포맷
 */
const formatAmount = (amount) => {
  return amount.toLocaleString() + '원';
};

/**
 * 수정 버튼
 */
const handleEdit = (id) => {
  router.push({ name: 'edit-transaction', params: { id } });
};

/**
 * 삭제 버튼
 */
const handleDelete = async (id) => {
  console.log('삭제 요청 id:', id);

  if (!confirm('삭제하시겠습니까?')) return;

  try {
    await axios.delete(`http://localhost:3000/transactions/${id}`);

    const res = await axios.get('http://localhost:3000/transactions');
    transactions.value = res.data;
  } catch (err) {
    console.error(err);
  }
};
</script>

<style scoped>
@media (max-width: 991px) {
  .category-grid {
    grid-template-columns: 1fr;
  }
  .fixed-wrapper {
    grid-template-columns: 1fr;
  }
}

/* 캘린더 */
@media (max-width: 991px) {
  .calendar-container {
    width: 100%;
  }
  .calendar-cell {
    min-height: 60px;
  }
}
</style>
