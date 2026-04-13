<template>
  <div class="fixed-list">
    <!-- 헤더: 제목 + 추가 버튼 -->
    <div class="list-header">
      <span class="list-title">{{ title }}</span>
      <button class="btn btn-add" @click="goToAdd">+ 추가</button>
    </div>

    <!-- 목록 -->
    <div v-for="item in items" :key="item.id" class="list-row">
      <span class="row-title">{{ item.title }}</span>
      <span class="row-amount">{{ item.amount.toLocaleString() }}원</span>

      <div class="row-actions">
        <button class="btn btn-mint" @click="goToEdit(item.id)">수정</button>
        <button class="btn btn-red" @click="$emit('delete', item.id)">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  items: Array,
  type: {
    type: String,
    default: 'income', // 'income' | 'expense'
  },
});

defineEmits(['delete']);

const router = useRouter();

// 추가 버튼 → transactions 페이지로 이동 (type 쿼리로 수입/지출 구분)
const goToAdd = () => {
  router.push({
    name: 'transactions',
    query: { mode: 'add', type: props.type, fix: 'true' },
  });
};

// 수정 버튼 → transactions 페이지로 이동 (item id 쿼리로 전달)
const goToEdit = (id) => {
  router.push({ name: 'edit-transaction', params: { id } });
};
</script>

<style scoped>
.fixed-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  width: 100%;
  flex-wrap: nowrap;
}

.list-title {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.row-title {
  font-size: 14px;
  color: #333;
  flex: 1;
}

.row-actions {
  display: flex;
  gap: 6px;
}

/* 버튼 */
.btn {
  padding: 4px 14px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-add {
  background: #c4dff5;
  color: #293996;
}
.btn-mint {
  background: #d4f0d4;
  color: #2d8a2d;
}
.btn-red {
  background: #ffd6d6;
  color: #c0392b;
}
</style>
