<script setup>
defineProps({
  categories: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="category-grid">
    <button
      v-for="cat in categories"
      :key="cat.id"
      type="button"
      class="cat-item"
      :class="{ selected: modelValue === cat.id }"
      @click="$emit('update:modelValue', cat.id)"
    >
      <img :src="cat.image" :alt="cat.name" class="cat-img" />
      <span class="cat-name">{{ cat.name }}</span>
    </button>
  </div>
</template>
