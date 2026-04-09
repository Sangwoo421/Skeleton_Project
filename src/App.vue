<<<<<<< HEAD
<template>
  <div class="app-layout">
    <Sidebar />
    <div class="right-panel">
      <Header />
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from './components/layout/Header.vue';
import Sidebar from './components/layout/Sidebar.vue';
</script>

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
=======
<script setup>
import { useRoute } from 'vue-router';
// import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';

const route = useRoute();
</script>

<template>
  <div class="layout">
    <!-- <Sidebar /> -->

    <div class="main">
      <!-- <TopBar :title="pageTitle" /> -->

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
>>>>>>> main
