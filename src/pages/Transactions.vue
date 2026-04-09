<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import TransactionPreview from '@/components/transactions/TransactionPreview.vue';
import '@/assets/transactioncss/transactions.css';

const BASE = 'http://localhost:3000';

const categories = ref([]);
const isRecurring = ref(false);

const form = ref({
  type: 'income',
  date: '',
  amount: '',
  memo: '',
  categoryId: '',
  title: '',
  userId: 'u1',
  fix: 'false',
});

onMounted(async () => {
  const { data } = await axios.get(`${BASE}/categories`);
  categories.value = data;
  form.value.date = new Date().toISOString().slice(0, 10);
});

const filteredCategories = computed(() => categories.value);

const selectedCategory = computed(
  () => categories.value.find((c) => c.id === form.value.categoryId) || null,
);

async function handleSubmit() {
  if (!form.value.date) return alert('날짜를 입력해주세요');
  if (!form.value.amount || Number(form.value.amount) <= 0)
    return alert('금액을 입력해주세요');
  if (!form.value.title) return alert('내용을 입력해주세요');

  await axios.post(`${BASE}/transactions`, {
    userId: form.value.userId,
    categoryId: form.value.categoryId || null,
    type: form.value.type,
    amount: Number(form.value.amount),
    date: form.value.date,
    memo: form.value.memo,
    fix: isRecurring.value,
  });

  alert('저장되었습니다');
  handleCancel();
}

function handleCancel() {
  form.value = {
    type: 'income',
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    title: '',
    memo: '',
    categoryId: '',
    userId: 'u1',
    fix: false,
  };
  isRecurring.value = false;
}
</script>

<template>
  <div class="p-4" style="padding: 16px">
    <div class="row g-3 align-items-start">
      <!-- 수입/지출 등록  -->
      <div class="col-8">
        <TransactionForm
          :form="form"
          :filtered-categories="filteredCategories"
          :is-recurring="isRecurring"
          @update:form="form = $event"
          @update:is-recurring="isRecurring = $event"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>

      <!-- 미리보기 -->
      <div class="col-4">
        <TransactionPreview
          :form="form"
          :selected-category="selectedCategory"
        />
      </div>
    </div>
  </div>
</template>
