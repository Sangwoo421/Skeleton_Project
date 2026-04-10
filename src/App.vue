<script setup>
import { useRoute } from 'vue-router';
import Header from './components/layout/Header.vue';
import Sidebar from './components/layout/Sidebar.vue';
import TopBar from './components/layout/TopBar.vue';

const route = useRoute();
</script>

<template>
  <div class="app-layout">
    <Sidebar />
    <div class="right-panel">
      <!-- 설정 페이지면 TopBar, 나머지는 Header -->
      <TopBar v-if="route.name === 'setting'" title="설정" />
      <Header v-else />

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.right-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  background: #f5f4f0;
}
</style>
