<template>
  <div class="topbar">
    <span class="topbar-title">{{ title }}</span>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
.topbar {
  width: 100%;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 2rem 28px;
  border-bottom: 1px solid black;
}

.topbar-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}
</style>
