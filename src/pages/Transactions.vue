<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import TransactionForm from '@/components/transactions/TransactionForm.vue';
import TransactionPreview from '@/components/transactions/TransactionPreview.vue';
import '@/assets/transactioncss/transactions.css';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

const BASE = 'http://localhost:3000';

const categories = ref([]);
const isRecurring = ref(false);

const isEditMode = computed(() => !!route.params.id);

const form = ref({
  type: 'expense',
  date: '',
  amount: '',
  memo: '',
  categoryId: '',
  title: '',
  userId: 'u1',
  fix: false,
});

onMounted(async () => {
  const { data: cats } = await axios.get(`${BASE}/categories`);
  categories.value = cats;

  //  수정
  if (isEditMode.value) {
    const { data } = await axios.get(`${BASE}/transactions/${route.params.id}`);
    form.value = {
      type: data.type,
      date: data.date,
      amount: data.amount,
      memo: data.memo,
      categoryId: data.categoryId,
      title: data.title,
      userId: data.userId,
      fix: data.fix,
    };
    isRecurring.value = data.fix;
  } else {
    // 등록
    form.value.date = new Date().toISOString().slice(0, 10);
  }
});

const filteredCategories = computed(() => categories.value);

const selectedCategory = computed(
  () => categories.value.find((c) => c.id === form.value.categoryId) || null,
);

const handleSubmit = async () => {
  try {
    if (!form.value.date) return alert('날짜를 입력해주세요');
    if (!form.value.amount || Number(form.value.amount) <= 0)
      return alert('금액을 입력해주세요');
    if (!form.value.title) return alert('내용을 입력해주세요');

    const payload = {
      userId: form.value.userId,
      categoryId: form.value.categoryId || null,
      type: form.value.type,
      title: form.value.title,
      amount: Number(form.value.amount),
      date: form.value.date,
      memo: form.value.memo,
      fix: isRecurring.value,
    };

    if (isEditMode.value) {
      // 수정
      await axios.put(`${BASE}/transactions/${route.params.id}`, payload);
      alert('수정되었습니다');
    } else {
      // 등록
      await axios.post(`${BASE}/transactions`, payload);
      alert('저장되었습니다');
    }
    setTimeout(() => {
      router.push('/history');
    }, 800);
  } catch (error) {
    console.error(error);
    alert('저장 실패했습니다');
  }
};

const handleCancel = () => {
  form.value = {
    type: form.value.type,
    date: new Date().toISOString().slice(0, 10),
    amount: '',
    title: '',
    memo: '',
    categoryId: '',
    userId: 'u1',
    fix: false,
  };
  isRecurring.value = false;
};
</script>

<template>
  <div class="p-4" style="padding: 16px">
    <div class="row g-3 align-items-start justify-content-center">
      <!-- 수입/지출 등록  -->
      <div class="col-12 col-lg-4">
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
      <div class="col-12 col-lg-3">
        <TransactionPreview
          :form="form"
          :selected-category="selectedCategory"
        />
      </div>
    </div>
  </div>
</template>
