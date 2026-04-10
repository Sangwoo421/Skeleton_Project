<template>
  <div class="d-flex justify-content-center align-items-center gap-1 mt-4">
    <!-- 이전 버튼 -->
    <button
      class="btn btn-outline-secondary btn-sm rounded-circle"
      style="width: 36px; height: 36px"
      :disabled="currentPage === 1"
      @click="goPrev"
    >
      <i class="bi bi-chevron-left" />
    </button>

    <!-- 페이지 번호 -->
    <button
      v-for="page in visiblePages"
      :key="page"
      class="btn btn-sm rounded-circle"
      style="width: 36px; height: 36px"
      :class="
        currentPage === page ? 'btn-active-mint' : 'btn-outline-secondary'
      "
      @click="$emit('update:currentPage', page)"
    >
      {{ page }}
    </button>

    <!-- 다음 버튼 -->
    <button
      class="btn btn-outline-secondary btn-sm rounded-circle"
      style="width: 36px; height: 36px"
      :disabled="currentPage === totalPages"
      @click="goNext"
    >
      <i class="bi bi-chevron-right" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(['update:currentPage']);

const visiblePages = computed(() => {
  const size = 5;
  const start = Math.floor((props.currentPage - 1) / size) * size + 1;
  const end = Math.min(start + size - 1, props.totalPages);
  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

const goPrev = () => {
  if (props.currentPage > 1) emit('update:currentPage', props.currentPage - 1);
};

const goNext = () => {
  if (props.currentPage < props.totalPages)
    emit('update:currentPage', props.currentPage + 1);
};
</script>

<style scoped>
.btn-active-mint {
  background: #d4f0d4;
  color: #2d8a2d;
  border: 1px solid gray;
  font-weight: 600;
}
</style>
