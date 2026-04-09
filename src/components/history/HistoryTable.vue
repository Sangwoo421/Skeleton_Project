<template>
  <table border="1" width="100%">
    <thead>
      <tr>
        <th>날짜</th>
        <th>내용</th>
        <th>카테고리</th>
        <th>금액</th>
        <th>구분</th>
        <th>관리</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="t in transactions" :key="t.id">
        <td>{{ formatDate(t.date) }}</td>

        <td>
          <div>{{ t.title }}</div>
          <div v-if="t.memo" style="font-size: 12px; color: gray">
            {{ t.memo }}
          </div>
        </td>

        <td>
          <span :style="{ color: getCategory(t.categoryId)?.color }">
            {{ getCategory(t.categoryId)?.name }}
          </span>
        </td>

        <td>
          <span :style="{ color: t.type === 'expense' ? 'red' : 'green' }">
            {{ t.type === 'expense' ? '-' : '+' }}{{ formatAmount(t.amount) }}
          </span>
        </td>

        <td>
          {{ t.type === 'income' ? '수입' : '지출' }}
        </td>

        <td>
          <button @click="$emit('edit', t.id)">수정</button>
          <button @click="$emit('delete', t.id)">삭제</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  transactions: Array,
  categories: Array,
  formatDate: Function,
  formatAmount: Function,
  getCategory: Function,
});

defineEmits(['edit', 'delete']);
</script>
