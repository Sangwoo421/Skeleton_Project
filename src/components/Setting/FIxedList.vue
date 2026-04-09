<template>
  <div class="section">
    <div class="section-header center">{{ title }}</div>

    <div class="one-col">
      <div v-for="item in items" :key="item.id" class="list-row">
        <div class="row-title">{{ item.title }}</div>

        <!-- <div>{{ item.amount.toLocaleString() }}원</div> -->

        <div class="row-actions">
          <button class="btn btn-mint" @click="$emit('edit', item)">
            수정
          </button>

          <button class="btn btn-red" @click="$emit('delete', item.id)">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
});

defineEmits(['edit', 'delete']);
</script>
