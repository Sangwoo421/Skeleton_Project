<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

import Profile from '@/components/Setting/Profile.vue';
import FixedList from '@/components/Setting/FixedList.vue';
import CategorySelector from '@/components/Setting/CategoryList.vue';

// ── 카테고리 ──────────────────────────────────
const categories = ref([]);
const selectedCategory = ref(null);

const fetchCategories = async () => {
  const res = await axios.get('/api/categories');
  categories.value = res.data;
};

// ── 고정 수입/지출 ─────────────────────────────
const transactions = ref([]);

const fetchTransactions = async () => {
  const res = await axios.get('/api/transactions');
  transactions.value = res.data;
};

const fixedIncome = computed(() =>
  transactions.value.filter((v) => v.fix === true && v.type === 'income'),
);

const fixedExpense = computed(() =>
  transactions.value.filter((v) => v.fix === true && v.type === 'expense'),
);

const deleteFixed = async (id) => {
  await axios.delete(`/api/transactions/${id}`);
  transactions.value = transactions.value.filter((v) => v.id !== id);
};

const updateFixed = async (item) => {
  await axios.patch(`/api/transactions/${item.id}`, item);
  transactions.value = transactions.value.map((v) =>
    v.id === item.id ? item : v,
  );
};

onMounted(() => {
  fetchCategories();
  fetchTransactions();
});
</script>

<template>
  <div class="setting-page">
    <!-- 개인 설정: Profile 내부에 타이틀 포함되어 있으므로 card-label 제거 -->
    <Profile />

    <!-- 사용자 설정 -->
    <section class="card">
      <p class="card-label">사용자 설정</p>

      <!-- 카테고리 수정 -->
      <div class="section-block">
        <h3 class="section-title">카테고리 수정</h3>
        <CategorySelector
          :categories="categories"
          :editable="true"
          v-model="selectedCategory"
        />
      </div>

      <hr class="divider" />

      <!-- 고정 수입 / 고정 지출: 가로 2열 -->
      <div class="fixed-wrapper">
        <div>
          <h3 class="section-title">고정 수입</h3>
          <FixedList
            :items="fixedIncome"
            @delete="deleteFixed"
            @edit="updateFixed"
          />
        </div>
        <div>
          <h3 class="section-title">고정 지출</h3>
          <FixedList
            :items="fixedExpense"
            @delete="deleteFixed"
            @edit="updateFixed"
          />
        </div>
      </div>
    </section>
  </div>
</template>
