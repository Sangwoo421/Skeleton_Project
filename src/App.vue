<template>
  <div class="layout">
    <!-- <Sidebar /> -->

    <div class="main">
      <h2 class="title">설정</h2>
      <!-- <TopBar :title="pageTitle" /> -->

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
// import Sidebar from '@/components/Sidebar.vue';
import TopBar from '@/components/layout/TopBar.vue';

const route = useRoute();
</script>
