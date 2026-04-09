<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import Profile from '@/components/Setting/Profile.vue';
import FixedList from '@/components/Setting/FixedList.vue';

const transactions = ref([]);

const fetchTransactions = async () => {
  const res = await axios.get('/api/transactions');
  transactions.value = res.data;
};

onMounted(fetchTransactions);

const fixedList = computed(() =>
  transactions.value.filter((v) => v.fix === true),
);

const fixedIncome = computed(() =>
  fixedList.value.filter((v) => v.type === 'income'),
);

const fixedExpense = computed(() =>
  fixedList.value.filter((v) => v.type === 'expense'),
);

const deleteFixed = async (id) => {
  await axios.delete(`/api/transactions/${id}`);
  transactions.value = transactions.value.filter((v) => v.id !== id);
};

const updateFixed = async (item) => {
  const newTitle = prompt('이름 수정', item.title);
  if (!newTitle) return;

  const updated = { ...item, title: newTitle };

  await axios.patch(`/api/transactions/${item.id}`, updated);

  transactions.value = transactions.value.map((v) =>
    v.id === item.id ? updated : v,
  );
};
</script>

<template>
  <div class="setting-page">
    <Profile />

    <!-- 고정 수입 -->
    <FixedList
      title="저장된 고정 수입"
      :items="fixedIncome"
      @delete="deleteFixed"
      @edit="updateFixed"
    />

    <!-- 고정 지출 -->
    <FixedList
      title="저장된 고정 지출"
      :items="fixedExpense"
      @delete="deleteFixed"
      @edit="updateFixed"
    />
  </div>
</template>
