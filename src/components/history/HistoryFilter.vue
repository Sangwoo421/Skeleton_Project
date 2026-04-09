<template>
  <div style="margin-bottom: 20px">
    <label>기간</label>
    <input
      type="date"
      :value="filters.startDate"
      @input="update('startDate', $event.target.value)"
      :max="filters.endDate"
    />
    ~
    <input
      type="date"
      :value="filters.endDate"
      @input="update('endDate', $event.target.value)"
      :min="filters.startDate"
    />

    <label>구분</label>
    <select :value="filters.type" @change="update('type', $event.target.value)">
      <option value="">전체</option>
      <option value="income">수입</option>
      <option value="expense">지출</option>
    </select>

    <label>카테고리</label>
    <select
      :value="filters.categoryId"
      @change="update('categoryId', $event.target.value)"
    >
      <option value="">전체</option>
      <option v-for="c in categories" :key="c.id" :value="c.id">
        {{ c.name }}
      </option>
    </select>

    <input
      type="text"
      :value="filters.keyword"
      @input="update('keyword', $event.target.value)"
      placeholder="메모 검색"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  filters: Object,
  categories: Array,
});

const emit = defineEmits(['update:filters']);

const update = (key, value) => {
  emit('update:filters', {
    ...props.filters,
    [key]: value,
  });
};
</script>
