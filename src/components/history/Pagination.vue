<template>
  <div style="margin-top: 20px">
    <button @click="goPrev" :disabled="currentPage === 1">이전</button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('update:currentPage', page)"
      :style="{ fontWeight: currentPage === page ? 'bold' : 'normal' }"
    >
      {{ page }}
    </button>

    <button @click="goNext" :disabled="currentPage === totalPages">다음</button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(['update:currentPage']);

const goPrev = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const goNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>
